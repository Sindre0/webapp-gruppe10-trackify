import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Result } from "../../types/result";
import { users } from "@/db/schema/user-schema";
import { env } from "cloudflare:workers";
import { UserLoginParams, UserRegisterParams } from "./userService";
import { leaderboard_has_user } from "@/db/schema/leaderboardHasUser-schema";

export interface UserRepository {
    findByLogin(login: UserLoginParams): Promise<Result<any>>;
    createUser(register: UserRegisterParams): Promise<Result<any>>;
    getAllUserLeaderboards(userID: string): Promise<Result<any>>;
    getUsername(userID: string): Promise<Result<any>>;
    deleteUser(userID: string): Promise<Result<any>>;
}

export function createUserRepository(): UserRepository {
    return {
        async findByLogin(login: UserLoginParams) {
            const db = drizzle(env.DB);
            const user = await db.select().from(users).where((eq(users.email, login.email), eq(users.passwordHash, login.password)));
            
            if (user.length == 0) {
                return { success: false, error: { message: "User not found", code: 404 } };
            }

            return {success: true, data: user[0]};
        },
        async createUser(register: UserRegisterParams) {
            console.log("Creating user with data:", register.username, register.email);
            const db = drizzle(env.DB);

            const existingUser = await db.select().from(users).where((eq(users.email, register.email)));
            if (existingUser.length > 0) {
                return { success: false, error: { message: "Email already in use", code: 409 } };
            }
            
            let newUser; 
                try {
                    newUser = await db.insert(users).values({
                        id: crypto.randomUUID(),
                        username: register.username,
                        email: register.email,
                        passwordHash: register.password
                });
                } catch (error) {
                    newUser = undefined;
                }
                
            if (newUser == undefined) {
                return { success: false, error: { message: "User creation failed", code: 500 } };
            }

            const data = { message: "User was added" };
            return { success: true, data: data };
        },
        async getAllUserLeaderboards(userID: string) {
            const db = drizzle(env.DB);
            const leaderboards = await db.select({
                leaderboard_id: leaderboard_has_user.leaderboard_id,
                is_owner: leaderboard_has_user.is_owner,
                is_mod: leaderboard_has_user.is_mod
            }).from(leaderboard_has_user).where(eq(leaderboard_has_user.user_id, userID));
            if (leaderboards.length == 0) {
                return { success: false, error: { message: "No leaderboards found for user", code: 404 } };
            }

            return { success: true, data: leaderboards };
        },
        async getUsername(userID: string) {
            const db = drizzle(env.DB);
            const user = await db.select({
                username: users.username
            }).from(users).where(eq(users.id, userID));

            if (user.length == 0) {
                return { success: false, error: { message: "User not found", code: 404 } };
            }

            return { success: true, data: user };
        },
        async deleteUser(userID: string) {
            const db = drizzle(env.DB);
            
            const user = await db.select().from(users).where(eq(users.id, userID));
            if (user.length === 0) {
                return { success: false, error: { message: "User not found", code: 404 } };
            }

            try {
                await db.delete(users).where(eq(users.id, userID));
                return { success: true, data: { message: "User deleted successfully" } };
            } catch (error) {
                console.error("Error deleting user:", error);
                return { success: false, error: { message: "Failed to delete user", code: 500 } };
            }
        }
    };
}