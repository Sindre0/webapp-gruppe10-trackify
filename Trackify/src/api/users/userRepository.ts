import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Result } from "../../types/result";
import { users } from "@/db/schema/user-schema";
import { env } from "cloudflare:workers";
import { UserLoginParams, UserRegisterParams } from "./userService";

export interface UserRepository {
    findByLogin(login: UserLoginParams): Promise<Result<any>>;
    createUser(register: UserRegisterParams): Promise<Result<any>>;
}

export function createUserRepository(): UserRepository {
    return {
        async findByLogin(login: UserLoginParams) {
            const db = drizzle(env.DB);
            // select user where email and password match
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
        }
    };
}