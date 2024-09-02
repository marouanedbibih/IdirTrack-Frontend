import axiosClient from "@/api/axiosClient"
import { IMyResponse } from "@/operators/types"
import { IClientRequest } from "./types/type";

// Get list of clients for dropdown
export const getClientsForDropdown = async (): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get('/api/v1/clients/dropdown');
        return data;
    } catch (error: any) {
        return error.response.data;
    }
}

//  get list of clients with pagination
export const getListOfClientsAPI = async (page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/clients?page=${page}&size=${size}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}

// Search client by keyword
export const searchClientAPI = async (keyword: string, page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/clients/search?keyword=${keyword}&page=${page}&size=${size}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}


// Create client API
export const createClientAPI = async (req: IClientRequest): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.post('/api/v1/client', req);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}


// Get client by id
export const getClientByIdAPI = async (id: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/client/${id}`);
        return data;
    } catch (error: any) {
        return error.response.data;
    }
}

// Update client by id
export const updateClientAPI = async (id: number, req: IClientRequest): Promise<ApiResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/client/${id}`, req);
        return data;
    } catch (error: any) {
        return error.response.data;
    }
}

// Delete client by id
export const deleteClientAPI = async (id: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/client/${id}`);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }
}