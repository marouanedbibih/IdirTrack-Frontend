export interface IDeviceType {
    id: number;
    name: string;
    totalDevices: number;
}


export enum DeviceStatus {
    INSTALLED = "INSTALLED",
    NON_INSTALLED = "NON_INSTALLED",
    PENDING = "PENDING",
    LOST = "LOST",
}

export interface IDeviceTypeRequest {
    name: string;
}

export interface ISelectDeviceType {
    id: number;
    name: string;
}