import { Result } from "@/types/result";
import { createUserRepository, UserRepository } from "./userRepository";

export type UserQueryParams = {
    password: string,
    email: string;
};

export interface UserService {
    getByLogin(login: UserQueryParams): Promise<Result<any | null>>;
}

export function createUserService(userRepository: UserRepository): UserService {
    return {
        async getByLogin(login: UserQueryParams): Promise<Result<any>> {
            
            // replace %20 into spaces in email and password
            login.email = decodeURIComponent(login.email);
            login.password = decodeURIComponent(login.password);

            return await userRepository.findByLogin(login);
        },
    };
}

export const userService = createUserService(createUserRepository());