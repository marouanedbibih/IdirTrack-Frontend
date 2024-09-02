import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";
import { StaffRequest } from "@/staff/type";
import { IMyErrorResponse, IMyResponse } from "@/types";


// Call the API to get list of all staffs
export const getListOfStaffsListAPI = async (page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/staffs?page=${page}&size=${size}`);
        console.info("Staff List Data", data);
        return data;
    } catch (error: any) {
        console.error("Staff List Error", error);
        throw error.response.data as IMyErrorResponse;
    }
}


// Call the API to search for staffs
export const searchStaffsAPI = async (search: string, page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/staffs/search?search=${search}&page=${page}&size=${size}`);
        console.info("Staff List Data", data);
        return data;
    } catch (error: any) {
        console.error("Staff List Error", error);
        throw error.response.data as IMyErrorResponse;
    }
}

// Call the API to delete a staff
export const deleteStaffAPI = async (id: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/staff/${id}`);
        console.info("Delet staff Data", data);
        return data;
    } catch (error: any) {
        console.error("Staff List Error", error);
        throw error.response.data as IMyErrorResponse;
    }
}

// Call the API to create a staff
export const createStaffAPI = async (staff: StaffRequest): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/staff`, staff);
        console.info("Create staff Data", data);
        return data;
    } catch (error: any) {
        console.error("Create staff Error", error);
        throw error.response.data as IMyErrorResponse;
    }
}

// Call the API to get a staff by id
export const getStaffByIdAPI = async (id: number): Promise<IMyResponse> => {
    // Try to call the api
    try {
        const { data } = await axiosClient.get(`/api/v1/staff/${id}`);
        console.info("Get staff Data", data);
        return data;
    } 
    // Catch the error
    catch (error: any) {
        console.error("Get staff Error", error);
        throw error.response.data as IMyErrorResponse;
    }
}

// Call the API to update a staff
export const updateStaffAPI = async (id: number, staff: StaffRequest): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/v1/staff/${id}`, staff);
        console.info("Update staff Data", data);
        return data;
    } catch (error: any) {
        console.error("Update staff Error", error);
        throw error.response.data as IMyErrorResponse; 
    }
}