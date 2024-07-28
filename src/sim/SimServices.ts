import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";
import { Sim } from "./SimDTOs";

/**
 * Get SIM list API
 * @param page 
 * @param size 
 * @returns 
 */
export const getSimListApi = async (page: number, size: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/sim/?page=${page}&size=${size}`);
        console.log("Fetch SIM list response", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Delete SIM API
 * @param simId SIM ID
 * @returns Promise<BasicResponse>
 * @throws Error
 */

export const deleteSimApi = async (simId: number | null): Promise<BasicResponse> => {
    if (simId === null) {
        throw new Error("SIM ID cannot be null");
    }
    try {
        const { data } = await axiosClient.delete(`/stock-api/sim/${simId}/`);
        console.log("Delete SIM response", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Create SIM API
 * @param sim SIM DTO
 * @returns Promise<BasicResponse>
 * @throws Error
 */

export const createSimApi = async (payload: Sim): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.post(`/stock-api/sim/`, payload);
        console.log("Create SIM response", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Create new sim error", data);
        throw data;
    }
}

/**
 * Fetch Operator list API
 */
export const fetchOperatorsApi = async (): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/operators/`);
        console.log("Fetch Operator list response", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Update device error", data);
        throw data;
    }
}

/**
 * Get Sim infos API
 * @param simId SIM ID
 * @returns Promise<BasicResponse>
 * @throws Error
 */

export const getSimByIdApi = async (simId: number | null): Promise<BasicResponse> => {
    if (simId === null) {
        throw new Error("SIM ID cannot be null");
    }
    try {
        const { data } = await axiosClient.get(`/stock-api/sim/${simId}/`);
        console.log("Fetch SIM response", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Update device error", data);
        throw data;
    }
}

/**
 * Update SIM API
 * @param simId SIM ID
 * @param payload SIM DTO
 * @returns Promise<BasicResponse>
 * @throws Error
 */

export const updateSimApi = async (simId: number | null, payload: Sim): Promise<BasicResponse> => {
    if (simId === null) {
        throw new Error("SIM ID cannot be null");
    }
    try {
        const { data } = await axiosClient.put(`/stock-api/sim/${simId}/`, payload);
        console.log("Update SIM response", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Update device error", data);
        throw data;
    }
}