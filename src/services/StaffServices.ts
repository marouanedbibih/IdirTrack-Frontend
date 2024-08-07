import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";
import { StaffRequest } from "@/types/StaffTypes";

const STAFF_API = process.env.NEXT_PUBLIC_STAFF_API

/**
 * @api {get} /staffs Get all staffs
 * 
 */
export const getAllStaffsListAPI = async (page: number, size: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`${STAFF_API}?page=${page}&size=${size}`);
        console.info("Staff List Data", data);
        return data;
    } catch (error: any) {
        const { data } = error.response.data;
        console.error("Staff List Error", data);
        throw data;
    }
}

/**
 * @api {get} /staff/search Search staffs
 * This function is used to call the api in the user microservice to dearch staff by her name, phone number, 
 * position, client name or client company name.
 * 
 * @param {string} search The value to search for
 * @param {number} page The page number
 * @param {number} size The size of the page
 */

export const searchStaffsAPI = async (search: string, page: number, size: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`${STAFF_API}/search/?search=${search}&page=${page}&size=${size}`);
        console.info("Staff List Data", data);
        return data;
    } catch (error: any) {
        const { data } = error.response.data;
        console.error("Staff List Error", data);
        throw data;
    }
}

/**
 * @api {delete} /staff/:id Delete a staff
 * This function is used to call the api in the user microservice to delete a staff by her id.
 * 
 * @param {number} id The id of the staff to delete
 */

export const deleteStaffAPI = async (id: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.delete(`${STAFF_API}/${id}/`);
        console.info("Delet staff Data", data);
        return data;
    } catch (error: any) {
        const { data } = error.response.data;
        console.error("Staff List Error", data);
        throw data;
    }
}

/**
 * @api {post} /staff/ Create a staff
 * This function is used to call the api in the user microservice to create a new staff.
 * 
 * @param {StaffRequest} staff The staff object to create
 * @returns {Promise<BasicResponse>} The response from the server
 */

export const createStaffAPI = async (staff: StaffRequest): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.post(`${STAFF_API}`, staff);
        console.info("Create staff Data", data);
        return data;
    } catch (error: any) {
        const errorData: BasicResponse = error.response.data;
        console.error("Create staff Error", errorData);
        throw errorData;
    }
}

/**
 * GET STAFF BY ID
 * 
 * This service is used to call the api in the user microservice to get a staff by her id.
 * 
 * @api {get} /staff/:id Get a staff by id
 * @param id
 * @returns BasicResponse
 * @throws BasicResponse
 */

export const getStaffByIdAPI = async (id: number): Promise<BasicResponse> => {
    // Try to call the api
    try {
        const { data } = await axiosClient.get(`${STAFF_API}/${id}/`);
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

/**
 * UPDATE STAFF
 * 
 * This service is used to call the api in the user microservice to update a staff by her id.
 * 
 * @api {put} /staff/:id Update a staff by id
 * @param id
 * @param staff
 * @returns BasicResponse
 * @throws BasicResponse
 */

export const updateStaffAPI = async (id: number, staff: StaffRequest): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.put(`${STAFF_API}/${id}/`, staff);
        console.info("Update staff Data", data);
        return data;
    } catch (error: any) {
        const errorData: BasicResponse = error.response.data;
        console.error("Update staff Error", errorData);
        throw errorData;
    }
}