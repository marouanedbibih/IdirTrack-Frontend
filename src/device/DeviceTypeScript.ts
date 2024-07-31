

export interface DeviceInterface {
    id: number;
    imei: string;
    createAt?: Date | string;
    updateAt?: Date | string;
    remarque?: string | null;

    deviceType: string;
    deviceTypeId?: number;
    status: string;

}

export interface DeviceFormData {
    id?: number;
    imei: string | null;
    remarque: string | null;
    deviceTypeId: number | null;
}

export enum DeviceStatus {
    INSTALLED,
    NON_INSTALLED,
    LOST,
    DAMAGED
}

export interface DeviceTypeInterface {
    id: number;
    name: string;
}





