import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";
import { StaffRequest } from "@/staff/type";


// Call the API to get list of all staffs
export const getAllStaffsListAPI = async (page: number, size: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/staffs?page=${page}&size=${size}`);
        console.info("Staff List Data", data);
        return data;
    } catch (error: any) {
        const { data } = error.response.data;
        console.error("Staff List Error", data);
        throw data;
    }
}


// Call the API to search for staffs
export const searchStaffsAPI = async (search: string, page: number, size: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/staffs/search?search=${search}&page=${page}&size=${size}`);
        console.info("Staff List Data", data);
        return data;
    } catch (error: any) {
        const { data } = error.response.data;
        console.error("Staff List Error", data);
        throw data;
    }
}

// Call the API to delete a staff
export const deleteStaffAPI = async (id: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/v1/staff/${id}`);
        console.info("Delet staff Data", data);
        return data;
    } catch (error: any) {
        const { data } = error.response.data;
        console.error("Staff List Error", data);
        throw data;
    }
}

// Call the API to create a staff
export const createStaffAPI = async (staff: StaffRequest): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.post(`/api/v1/staff`, staff);
        console.info("Create staff Data", data);
        return data;
    } catch (error: any) {
        const errorData: BasicResponse = error.response.data;
        console.error("Create staff Error", errorData);
        throw errorData;
    }
}

// Call the API to get a staff by id
export const getStaffByIdAPI = async (id: number): Promise<BasicResponse> => {
    // Try to call the api
    try {
        const { data } = await axiosClient.get(`/api/v1/staff/${id}`);
        console.info("Get staff Data", data);
        return data;
    } 
    // Catch the error
    catch (error: any) {
        const errorData: BasicResponse = error.response.data;
        console.error("Get staff Error", errorData);
        throw errorData;
    }
}

// Call the API to update a staff
export const updateStaffAPI = async (id: number, staff: StaffRequest): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/v1/staff/${id}`, staff);
        console.info("Update staff Data", data);
        return data;
    } catch (error: any) {
        const errorData: BasicResponse = error.response.data;
        console.error("Update staff Error", errorData);
        throw errorData;
    }
}