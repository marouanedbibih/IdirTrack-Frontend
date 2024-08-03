
// Staff Interface
export interface Staff {
    id: number;
    name: string;
    phone: string;
    position: string;

    // Client
    clientId: number;
    clientName: string;
    clientCompany: string;
}

// Staff Request

export interface StaffRequest {
    name: string;
    phone: string;
    position: string;
    clientId: number;
}
