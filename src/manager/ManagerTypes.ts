export interface IManagerRequest {
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
}

export interface IManager {
    userId: number;
    managerId: number;
    traccarId: number;
    username: string;
    name: string;
    email: string;
    phone: string;

}

export interface IUser {
    id: number;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    traccarId: number;
    role: UserRole;

}

export enum UserRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    CLIENT = "CLIENT",
    SUBCLIENT = "SUBCLIENT",
    USER = "USER",
}