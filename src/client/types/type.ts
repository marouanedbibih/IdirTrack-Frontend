export interface IClientDropdown {
    id: number;
    name: string;
    company: string;
}

export interface IUser {
    id: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    traccarId: number | null;
    role: string;
}

export interface IClient {
    id: number;
    company: string;
    cne: string;
    totalVehicles: number;
    category: string;
    disabled: boolean;

    user: IUser;
}


export interface IClientRequest {
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    cne: string;
    categoryId: number;
    isDisabled: boolean;
    remarque: string;
    company: string;
}


export interface IClientTableDTO {
    // IDs
    clientId: number;
    userId: number;

    // Client Info
    username: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    cne: string;
    categoryName: string;
    remarque: string;
    isDisabled: boolean;

    // Vehicles
    totalVehicles: number;
}

