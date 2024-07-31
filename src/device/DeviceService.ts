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

// Delete device api
export const deleteDeviceApi = async (id: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.delete(`/stock-api/devices/${id}/`);
        console.error("Delete device data ", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Delete device error", data);
        throw data;
    }
}

/**
 * Get device by id api
 * @param id 
 * @returns BasicResponse
 */
export const getDeviceByIdApi = async (id: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/devices/${id}/`);
        console.error("Get device by id data ", data);
        return data;
    } catch (error: any) {
        const data: BasicResponse = error.response.data;
        console.error("Get device by id error", data);
        throw data;
    }
}

/**
 * Update device api
 * @param id
 * @param payload
 * @returns BasicResponse
 * @throws BasicResponse
 */
export const updateDeviceApi = async (id: number, payload: DeviceFormData): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.put(`/stock-api/devices/${id}/`, payload);
        console.error("Update device data ", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Update device error", data);
        throw data;
    }

}

// Get device type by id api
export const getAllDeviceTypes = async (id: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/device-types/`);
        console.error("Get device type by id data ", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Get device type by id error", data);
        throw data;
    }
}


//filter device 
export const filterDeviceApi = async (filter: string): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/devices/filter?=${filter}`);
        console.error("Filter device data ", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Filter device error", data);
        throw data;
    }
}

//search device by imei
export const searchDeviceApi = async (imei: string): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/devices/search?imei=${imei}`);
        console.error("Search device data ", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Search device error", data);
        throw data;
    }
}