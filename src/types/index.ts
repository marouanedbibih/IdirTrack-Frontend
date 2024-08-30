export interface IPagination {
    currentPage: number;
    totalPages: number;
    totalElements?: number;
    size: number;
}

export interface IDisplayStatus {
    normal: boolean
    filter: boolean
    search: boolean
}

export interface IFieldErrors {
    field: string;
    message: string;
}

export interface IMyErrResponse {
    fieldErrors: IFieldErrors[];
    message: string;
    status: string;
}


export interface IFinallyProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}