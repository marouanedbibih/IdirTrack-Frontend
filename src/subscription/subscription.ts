export interface SubscriptionTableDTO {
    id: number;
    boitierId: number;
    imei: string;
    phone: string;
    matricule: string;
    clientName: string;
    startDate: string; 
    endDate: string;   
    timeLeft: string;
    status: "current" | "close" | "left";
  }
  