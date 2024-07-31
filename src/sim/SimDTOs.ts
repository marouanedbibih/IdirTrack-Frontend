export interface Sim {
    id: number | null;
    pin: string;
    puk: string;
    ccid: string;
    phone: string;
    status?: 'LOST' | 'OFFLINE' | 'ONLINE' | 'PENDING';
    createdAt?: string; // Assuming ISO date string format
    updatedAt?: string | null;
    operatorId: number;
    operatorName?: string;
}

export interface Operator {
    id: number;
    name: string;
}
