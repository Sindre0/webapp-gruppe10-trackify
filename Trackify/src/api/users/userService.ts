import { Result } from "@/types/result";
import { createUserRepository, UserRepository } from "./userRepository";

export type UserLoginParams = {
    password: string,
    email: string;
};

export type UserRegisterParams = {
    password: string,
    email: string;
    username: string;
};

export interface UserService {
    getByLogin(login: UserLoginParams): Promise<Result<any>>;
    registerUser(register: UserRegisterParams): Promise<Result<any>>;
}

export function createUserService(userRepository: UserRepository): UserService {
    return {
        async getByLogin(login: UserLoginParams): Promise<Result<any>> {
            login.email = decodeURIComponent(login.email);
            login.password = decodeURIComponent(login.password);

            return await userRepository.findByLogin(login);
        },
        async registerUser(register: UserRegisterParams): Promise<Result<any>> {
            register.email = decodeURIComponent(register.email);
            register.password = decodeURIComponent(register.password);
            register.username = decodeURIComponent(register.username ?? "");

            return await userRepository.createUser(register);
        }
    };
}

export const userService = createUserService(createUserRepository());