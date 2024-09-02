import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";
import { VehicleRequest } from "../types/VehicleDto";
import { IMyResponse } from "@/operators/types";

export const getVehicleListAPI = async (page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/vehicles/?page=${page}&size=${size}`);
        console.log("Vehicle list:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getVehicleByIdAPI = async (id: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/vehicles/${id}/`);
        console.log("Vehicle by id:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


/**
 * CREATE NEW VEHICLE
 *@description
 * This function is used to call the API to create a new vehicle.
 * 
 * @api POST /vehicle-api/vehicles/
 * @param vehicleRequest VehicleRequest
 * @returns BasicResponse
 * @throws Error
 */

export const createVehicleAPI = async (vehicleRequest: VehicleRequest): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/vehicles/`, vehicleRequest);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}


// Fetch boitiers assigned to vehicle
export const getVehicleBoitiersAPI = async (vehicleId: number | null): Promise<IMyResponse> => {
    if (!vehicleId) {
        throw new Error("Vehicle id is required");
    }
    else {
        try {
            const { data } = await axiosClient.get(`/api/vehicles/${vehicleId}/boities/`);
            return data;
        } catch (error: any) {
            console.error(error);
            throw error.response.data;
        }
    }
}

// Delete vehicle from database by id
export const deleteVehicleAPI = async (id: number | null, isLost: boolean): Promise<IMyResponse> => {
    if (!id) {
        throw new Error("Vehicle id is required");
    }
    try {
        const { data } = await axiosClient.delete(`/api/vehicles/${id}/?isLost=${isLost}`);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}

// Call API to search vehicle by query
export const searchVehicleAPI = async (term: string, page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/vehicles/search?search=${term}&page=${page}&size=${size}`);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}


export const getListOfVehicleAPI = async (page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/vehicles/?page=${page}&size=${size}`);
        console.log("Vehicle list:", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}