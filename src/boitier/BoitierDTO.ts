
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

export interface BoitierVehicle {
  id?: number;
  device: DeviceBoitier;
  sim: SimBoitier;
}


export interface BoitierRequest {
  
  deviceMicroserviceId: number | null;
  simMicroserviceId: number | null;
  startDate: string;
  endDate: string;
}


export interface BoitierErrors {
  device: string | null;
  sim: string | null;
  dateStart: string | null;
  dateEnd: string | null;
}