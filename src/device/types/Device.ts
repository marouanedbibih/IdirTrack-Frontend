export interface IDeviceRequest {
    imei: string;
    deviceTypeId: number;
    remarque: string;
}

export interface IDevice {
    id: number;
    imei: string;
    deviceTypeId?: number;
    deviceType: string;
    remarque: string;
    status: string;
    createAt: string;
    updateAt?: string;
}

export interface IDeviceFilter {
    status: string;
    type: number;
    createdFrom: string;
    createdTo: string;
}

export enum DeviceStatus {
    INSTALLED = "INSTALLED",
    NOT_INSTALLED = "NOT_INSTALLED",
    PENDING = "PENDING",
    LOST = "LOST",
}