import axiosClient from "@/api/axiosClient";
import { DeviceFormData } from "./DeviceTypeScript";
import { BasicResponse } from "@/types/Basics";

export const getDeviceListApi = async (page: number, size: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/devices/?page=${page}&size=${size}`);
        console.log("Device types list data ", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getDeviceTypeListApi = async (page: number, size: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/device-types/?page=${page}&size=${size}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Create new device api

export const createDeviceApi = async (payload: DeviceFormData): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.post("/stock-api/devices/", payload);
        console.error("Create device data ", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Create device error", data);
        throw data;
    }
}