import axiosClient from "@/api/axiosClient";
import { ICategoryRequest } from "./types/type";
import { IMyResponse } from "@/operators/types";

const prefixUrl = '/api/v1/client';

// Get list of client categories
export const getListOfClientCategoriesAPI = async (page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`${prefixUrl}/categories?page=${page}&size=${size}`);
        return data;
    }
    catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
};

// Get category by id
export const getClientCategoryByIdAPI = async (id: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`${prefixUrl}/category/${id}`);
        return data;
    }
    catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
};

// Create new category
export const createClientCategoryAPI = async (payload: ICategoryRequest): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.post(`${prefixUrl}/category`, payload);
        return data;
    }
    catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
};

// Update category by id
export const updateClientCategoryAPI = async (id: number, payload: ICategoryRequest): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.put(`${prefixUrl}/category/${id}`, payload);
        return data;
    }
    catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
};

// Delete category by id
export const deleteClientCategoryAPI = async (id: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.delete(`${prefixUrl}/category/${id}`);
        return data;
    }
    catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
};

// Get list of clients for dropdown
export const getClientCategoryiesForDropdownAPI = async (): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/client/categories/dropdown`);
        return data;
    }
    catch (error: any) {
        console.error(error);
        throw error.response.data;
    }
};