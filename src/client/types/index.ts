interface ApiResponse {
    content: any | null;
    message: string | null;
    messagesObject: any | null;
    messageType: string | null;
    redirectUrl: string | null;
    status: string;
    metadata: Metadata;
    error: any | null;
    errors: any | null;
    errorsList: any | null;
    errorObject: any | null;
}

interface Metadata {
    currentPage: number;
    totalPages: number;
    size: number;
    totalElements: number;
}

