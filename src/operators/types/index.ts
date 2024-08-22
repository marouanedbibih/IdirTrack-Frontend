
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