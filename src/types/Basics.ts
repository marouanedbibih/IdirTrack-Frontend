

export interface MetaData {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
}

export enum MessageType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  WARNING = "WARNING",
}

export interface BasicResponse {
  content?: any;
  message?: string;
  messageObject?: { [key: string]: string | null };
  messageType?: MessageType;
  redirectUrl?: string;
  status?: string;
  metadata?: MetaData;
}

export interface MessageInterface {
  message?: string;
  messageObject?: { [key: string]: string | null };
  messageType: MessageType;
}

// export { MetaData, MessageType, BasicResponse };
