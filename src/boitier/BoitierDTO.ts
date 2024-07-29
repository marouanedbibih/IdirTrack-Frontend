
export interface SimBoitier {
    id?: number;
    simMicroserviceId: number;
    ccid: string;
    phone: string;
    operatorName: string;
}


export interface BoitierRequest {
    deviceMicroserviceId: number;
    imei: string;
    deviceType: string;
    simMicroserviceId: number;
    phone: string;
    operatorName: string;
    ccid: string;
    startDate: string;
    endDate: string;
  }
  
  
  export interface BoitierErrors {
    device: string | null;
    sim: string | null;
    startDate: string | null;
    endDate: string | null;
  }