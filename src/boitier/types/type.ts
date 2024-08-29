export interface SimBoitier {
    id?: number;
    simMicroserviceId: number;
    ccid: string;
    phone: string;
    operatorName: string;
}

export interface IDeviceBoitier {
    id: number,
    deviceType: string,
    imei: string
}

export interface ISimBoitier {
    id: number,
    ccid: string,
    phone: string,
    operatorName: string
}

export interface ISubscription {
    id: number;
    startDate: string;
    endDate: string;
}
export interface IBoitier {
    id: number;
    device: IDeviceBoitier;
    sim: ISimBoitier;
    subscription: ISubscription;

}