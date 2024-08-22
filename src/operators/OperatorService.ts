import axiosClient from "@/api/axiosClient";
import { IMyResponse } from "./types";
import { IOperatorRequest } from "./types/type";

/**
 * Method to call the API to get all operators with pagination
 * @param page 
 * @param size 
 * @returns 
 */
export const getOperatorsWithPaginationAPI = async (page: number, size: number): Promise<IMyResponse> => {

    try {
        const { data } = await axiosClient.get(`/api/operators/?page=${page}&size=${size}`);
        console.log("Get operator with pagination response: ", data);
        return data;
    } catch (error: any) {
        console.log("Get operator with pagination error : ", error.response.data);
        throw error.response.data;
    }
}

/**
 * Method to call the API to get all operators
 * @returns
 * @throws 
 */
export const getAllOperatorsAPI = async (): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/operators/all/`);
        console.log("Get all operators response: ", data);
        return data;
    } catch (error: any) {
        console.log("Get all operators error : ", error.response.data);
        throw error.response.data;
    }
}

/**
 * Method to call the API to get an operator by id
 * @param id
 * @returns
 * @throws 
 */
export const getOperatorByIdAPI = async (id: number): Promise<any> => {
    try {
        const { data } = await axiosClient.get(`/api/operators/${id}/`);
        console.log("Get operator by id response: ", data);
        return data;
    } catch (error: any) {
        console.log("Get operator by id error : ", error.response.data);
        throw error.response.data;
    }
}

/**
 * Method to call the API to create an operator
 * @param {IOperatorRequest} req
 * @returns
 * @throws 
 */

export const createOperatorAPI = async (req: IOperatorRequest): Promise<any> => {
    try {
        const { data } = await axiosClient.post(`/api/operators/`, req);
        console.log("Create operator response: ", data);
        return data;
    } catch (error: any) {
        console.log("Create operator error : ", error.response.data);
        throw error.response.data;
    }
}

/**
 * Method to call the API to update an operator
 * @param id
 * @param {IOperatorRequest} req
 * @returns
 * @throws 
 */

export const updateOperatorAPI = async (id: number, req: IOperatorRequest): Promise<any> => {
    try {
        const { data } = await axiosClient.put(`/api/operators/${id}/`, req);
        console.log("Update operator response: ", data);
        return data;
    } catch (error: any) {
        console.log("Update operator error : ", error.response.data);
        throw error.response.data;
    }
}

/**
 * Method to call the API to delete an operator
 * @param id
 * @returns
 * @throws 
 */
export const deleteOperatorAPI = async (id: number): Promise<any> => {
    try {
        const { data } = await axiosClient.delete(`/api/operators/${id}/`);
        console.log("Delete operator response: ", data);
        return data;
    } catch (error: any) {
        console.log("Delete operator error : ", error.response.data);
        throw error.response.data;
    }
}

