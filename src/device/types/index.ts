export interface IPagination {
    currentPage: number;
    totalPages: number;
    size: number;
}

export interface IError {
    key: string;
    message: string;
}

export interface IDisplayStatus {
    normal: boolean;
    filter: boolean;
    search: boolean;
}