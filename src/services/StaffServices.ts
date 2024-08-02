import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";

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