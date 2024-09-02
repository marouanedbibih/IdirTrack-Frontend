import { IBoitier } from "@/boitier/types/type";

export type VehicleType = {
    id?: number | null;
    matricule?: string;
    type?: string;
  }
  
  export type ClientType = {
    id?: number;
    clientMicroserviceId: number;
    name: string;
    company: string;
  }
  
  export interface VehicleInterface {
    vehicle: VehicleType;
    client: ClientType;
    boitiersList?: BoitierInterface[];
  }
  
  export type DeviceType = {
    id?: number;
    deviceMicroserviceId?: number;
    imei?: string;
    type?: string;
  }
  
  export type SimType = {
    id?: number;
    simMicroserviceId?: number;
    phone?: string;
    ccid?: string;
    operatorName?: string;
  }
  
  export interface BoitierInterface {
    id?: number;
    device: DeviceType;
    sim: SimType;
    subscription: SubscriptionType;
    subscriptionList?: SubscriptionType[];
  }
  
  export type SubscriptionType = {
    id?: number;
    subscriptionMicroserviceId?: number;
    startDate?: string;
    endDate?: string;
  }
  
  export type Pagination = {
    currentPage: number;
    totalPages: number;
    totalItems?: number;
  }


export interface IVehicle {
  id: number;
  matricule: string;
  type: string;
}

export interface IClient {
  id: number;
  name: string;
  company: string;
}

export interface OBJVehicle {
  vehicle: IVehicle;
  client: IClient;
  boitiersList?: Array<IBoitier>;
}


  