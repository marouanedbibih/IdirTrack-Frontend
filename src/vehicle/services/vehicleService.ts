import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";

export const getVehicleListApi = async (page: number, size: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/vehicle-api/vehicles/?page=${page}&size=${size}`);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getVehicleById = async (id: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/vehicle-api/vehicles/${id}/`);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
