import axiosClient from "@/api/axiosClient";
import { IManagerRequest } from "./ManagerTypes";
import { IMyResponse } from "@/types";

// Get list of managers API
export const getAllManagersListAPI = async (page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/managers?page=${page}&size=${size}`);
        console.log("Manager List: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Fetching Manager List: ", error.response.data);
        throw error.response.data;
    }
}

// Create a new manager API
export const createManagerAPI = async (Manager: IManagerRequest): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/manager`, Manager);
        console.log("Manager Created: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Creating Manager: ", error.response.data);
        throw error.response.data;
    }
}

// Get manager by id API
export const getManagerByIdAPI = async (id: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/manager/${id}`);
        console.log("Manager: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Fetching Manager: ", error.response.data);
        throw error.response.data;
    }
}

// Update manager by id API
export const updateManagerAPI = async (id: number, Manager: IManagerRequest): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/manager/${id}`, Manager);
        console.log("Manager Updated: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Updating Manager: ", error.response.data);
        throw error.response.data;
    }
}

// Delete manager by id API
export const deleteManagerAPI = async (id: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/manager/${id}`);
        console.log("Manager Deleted: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Deleting Manager: ", error.response.data);
        throw error.response.data;
    }
}


