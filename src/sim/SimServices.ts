import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";
import { Sim } from "./SimDTOs";
import { IMyResponse } from "@/operators/types";
import { ISimRequest } from "./types/type";

/**
 * Get SIM list API
 * @param page 
 * @param size 
 * @returns 
 */
export const getSimListApi = async (page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/sim/?page=${page}&size=${size}`);
        console.log("Fetch SIM list response", data);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}

/**
 * Delete SIM API
 * @param simId SIM ID
 * @returns Promise<BasicResponse>
 * @throws Error
 */

export const deleteSimApi = async (simId: number | null): Promise<IMyResponse> => {
    if (simId === null) {
        throw new Error("SIM ID cannot be null");
    }
    try {
        const { data } = await axiosClient.delete(`/api/sim/${simId}/`);
        console.log("Delete SIM response", data);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}

/**
 * Create SIM API
 * @param sim SIM DTO
 * @returns Promise<BasicResponse>
 * @throws Error
 */

export const createSimAPI = async (req: ISimRequest): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/sim/`, req);
        console.log("Create SIM response", data);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

/**
 * Fetch Operator list API
 */
export const fetchOperatorsApi = async (): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/operators/`);
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

export const getSimByIdAPI = async (simId: number | null): Promise<IMyResponse> => {
    if (simId === null) {
        throw new Error("SIM ID cannot be null");
    }
    try {
        const { data } = await axiosClient.get(`/api/sim/${simId}/`);
        console.log("Fetch SIM response", data);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}

/**
 * Update SIM API
 * @param simId SIM ID
 * @param payload SIM DTO
 * @returns Promise<BasicResponse>
 * @throws Error
 */

export const updateSimAPI = async (simId: number | null, payload: ISimRequest): Promise<IMyResponse> => {
    if (simId === null) {
        throw new Error("SIM ID cannot be null");
    }
    try {
        const { data } = await axiosClient.put(`/api/sim/${simId}/`, payload);
        console.log("Update SIM response", data);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}


/**
 * Search SIMs API
 * @param term 
 * @param page 
 * @param size 
 * @returns 
 */
export const searchSimAPI = async (term: string, page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/sim/search/?term=${term}&page=${page}&size=${size}`);
        console.log("Search SIM response", data);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}

/**
 * Call API to get total SIM count
 * @api /api/sim/statistiques/total-sims/
 * 
 * @returns Promise<IMyResponse>
 * @throws Error
 */

export const getTotalSimCountAPI = async (): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/sim/statistiques/total-sims/`);
        console.log("Fetch total SIM count response", data);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}

/**
 * Call API to get SIM total count by status
 * @api /api/sim/statistiques/total-sims-by-status/
 * @returns Promise<IMyResponse>
 * @throws Error
 */

export const getTotalSimCountByStatusAPI = async (): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/sim/statistiques/total-sims-by-status/`);
        console.log("Fetch SIM count by status response", data);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}


/**
 * Call API to get SIMs of status non-installed with pagination
 * @api /api/sim/non-installed/?page=1&size=10
 * @param {number} page
 * @param {number} size
 * @returns Promise<IMyResponse>
 */

export const getNonInstalledSimsAPI = async (page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/sim/non-installed/?page=${page}&size=${size}`);
        console.log("Fetch non-installed SIMs response", data);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}

/**
 * Call API to search sim in non-installed sims
 * @api /api/sim/non-installed/search/?query=query&page=1&size=10
 * @param {string} query
 * @param {number} page
 * @param {number} size
 * @returns Promise<IMyResponse>
 * @throws
 */

export const searchNonInstalledSimsAPI = async (query: string, page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/sim/non-installed/search/?query=${query}&page=${page}&size=${size}`);
        console.log("Search non-installed SIMs response", data);
        return data;
    } catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
}

