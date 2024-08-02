export type Client =  {
    id?: number ;
    clientMicroserviceId: number;
    name: string;
    company: string;
}

export interface ClientDetails {
    // Client IDs
    id: number;
    clientMicroserviceId: number | null;

    // Client Infos
    name: string;
    company: string;
    description: string;
    createdAt: string;
    categoryName: string;

    // Client contact
    address: string;
    phone: string;
    email: string;
}
