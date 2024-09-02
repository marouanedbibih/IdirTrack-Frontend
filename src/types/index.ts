export interface IPagination {
    currentPage: number;
    totalPages: number;
    totalElements?: number;
    size: number;
}

export interface ILoading {
    delete: boolean;
    form: boolean;
    table: boolean;
}

export interface IDialog {
    delete: boolean;
    form: boolean;
    filter: boolean;
}

export interface IFetching {
    normal: boolean
    filter: boolean
    search: boolean
}


// Interface for manage IDs of any entity
export interface IID {
    delete: number | null;
    update: number | null;
    fetch: number | null;
}

export interface IMyResponse {
    data: any;
    metadata: any;
    message: string;
    status: string;
}
export interface IMyFieldError {
    field: string;
    message: string;
}

export interface IMyErrorResponse {
    message: string;
    fieldErrors: IMyFieldError[];
    status: string;
}


// --------------------------------------------------

export interface IFinallyProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
}



export interface IDisplayStatus {
    normal: boolean
    filter: boolean
    search: boolean
}
export interface InputError {
    key: string;
    message: string;
}