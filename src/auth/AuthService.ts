import { BasicResponse } from "@/types/Basics";
import { IAuth } from "./auth";
import axiosClient from "@/api/axiosClient";

export const loginAPI = async (auth: IAuth): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.post('/user-api/auth/login', auth);
        console.log(data);
        return data;
    } catch (error: any) {
        throw error.response.data;
    }

}