

export interface MetaData {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
}

export enum MessageType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
  INIT = "INIT",
}

export interface BasicResponse {
  content?: any;
  message?: string;
  messagesObject?: { [key: string]: string | null };
  messageType: MessageType;
  redirectUrl?: string;
  status?: string;
  metadata?: MetaData;
}

export interface MessageInterface {
  message?: string;
  messagesObject?: { [key: string]: string | null } | null;
  messageType: MessageType;
}

// export { MetaData, MessageType, BasicResponse };


export interface Pagination {
  currentPage: number;
  totalPages: number;
}