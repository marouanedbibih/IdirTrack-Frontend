export interface ISim {
    id: number;
    pin: string;
    puk: string;
    ccid: string;
    phone: string;
    status: string;
    createdAt: string;
    updatedAt?: string;
    operatorId?: number;
    operatorName: string;
}

export interface ISimRequest {
    pin: string;
    puk: string;
    ccid: string;
    phone: string;
    operatorId: number;
}


export enum SimStatus {
    INSTALLED = "INSTALLED",
    NON_INSTALLED = "NON_INSTALLED",
    PENDING = "PENDING",
    LOST = "LOST",
}