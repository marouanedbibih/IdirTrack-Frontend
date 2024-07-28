export interface Vehicle {
    id: number | null;
    matricule: string;
    type: string;
    client?: Client
}

export interface Client {
    id: string;
    name: string;

}