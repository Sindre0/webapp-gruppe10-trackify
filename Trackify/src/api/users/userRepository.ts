import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import type { Result } from "../../types/result";
import { users } from "@/db/schema/user-schema";
import { env } from "cloudflare:workers";
import { UserQueryParams } from "./userService";
    

export interface UserRepository {
    findByLogin(login: UserQueryParams): Promise<Result<any>>;
}

export function createUserRepository(): UserRepository {
    return {
        async findByLogin(login: UserQueryParams) {
            const db = drizzle(env.DB);
            // select user where email and password match
            const user = await db.select().from(users).where((eq(users.email, login.email), eq(users.passwordHash, login.password)));
            
            if (user.length == 0) {
                return { success: false, error: { message: "User not found", code: 404 } };
            }

            return {success: true, data: user[0]};
        },
    };
}