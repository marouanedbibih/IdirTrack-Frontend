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