
export interface SimBoitier {
  id?: number;
  simMicroserviceId: number;
  ccid: string;
  phone: string;
  operatorName: string;
}

export interface DeviceBoitier {
  id?: number;
  deviceMicroserviceId: number;
  imei: string;
  type: string;
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
  dateStart: string | null;
  dateEnd: string | null;
}