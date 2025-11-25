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
    getLeaderboards(userID: string): Promise<Result<any>>;
    getUsername(userID: string): Promise<Result<any>>;
    getUserByEmail(email: string): Promise<Result<any>>;
    deleteUser(userID: string): Promise<Result<any>>;
}

export function createUserService(userRepository: UserRepository): UserService {
    return {
        async getByLogin(login: UserLoginParams): Promise<Result<any>> {
            return await userRepository.findByLogin(login);
        },
        async registerUser(register: UserRegisterParams): Promise<Result<any>> {
            return await userRepository.createUser(register);
        },
        async getLeaderboards(userID: string): Promise<Result<any>> {
            userID = decodeURIComponent(userID);

            return await userRepository.getAllUserLeaderboards(userID);
        },
        async getUsername(userID: string): Promise<Result<any>> {
            userID = decodeURIComponent(userID);
            return await userRepository.getUsername(userID);
        },
        async getUserByEmail(email: string): Promise<Result<any>> {
            email = decodeURIComponent(email);
            return await userRepository.getUserByEmail(email);
        },
        async deleteUser(userID: string): Promise<Result<any>> {
            userID = decodeURIComponent(userID);
            return await userRepository.deleteUser(userID);
        }
    };
}

export const userService = createUserService(createUserRepository());