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
    phoneNumber?: string;
    ccid?: string;
    type?: string;
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
  