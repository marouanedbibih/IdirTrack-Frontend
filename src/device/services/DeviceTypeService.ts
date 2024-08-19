import axiosClient from "@/api/axiosClient";
import { BasicResponse, IResponse } from "@/types/Basics";
import { IDeviceTypeRequest } from "../types/DeviceType";

/**
 * Get all device types with pagination
 * 
 * This function is used to get all device types with pagination
 * 
 * @api GET /stock-api/device/type/?page=1&size=10
 * @param {number} page
 * @param {number} size
 * @returns {Promise<BasicResponse[]>}
 * @throws {Promise<BasicResponse>}
 */

export const getAllDeviceTypesListAPI = async (page: number, size: number): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/device/type/?page=${page}&size=${size}`);
        console.log("Get all device types with pagination Response", data);
        return data;
    } catch (error: any) {
        console.error("Get all device types with pagination Error", error.response.data);
        throw error.response.data;
    }
}

/**
 * Create a new device type
 * 
 * This function is used to create a new device type
 * 
 * @api POST /stock-api/device/type/
 * @param {IDeviceTypeRequest} payload
 * @returns {Promise<BasicResponse>}
 * @throws {Promise<BasicResponse>}
 */
export const createDeviceTypeAPI = async (payload: IDeviceTypeRequest): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.post(`/stock-api/device/type/`, payload);
        console.log("Create a new device type Response", data);
        return data;
    } catch (error: any) {
        console.error("Create a new device type Error", error.response.data);
        throw error.response.data;
    }
}

/**
 * Get device type by id
 * 
 * This function is used to get device type by id
 * 
 * @api GET /stock-api/device/type/{id}/
 * @param {number} id
 * @returns {Promise<BasicResponse>}
 * @throws {Promise<BasicResponse>}
 */
export const getDeviceTypeByIdAPI = async (id: number): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/device/type/${id}/`);
        console.log("Get device type by id Response", data);
        return data;
    } catch (error: any) {
        console.error("Get device type by id Error", error.response.data);
        throw error.response.data;
    }
}

/**
 * Update device type by id
 * 
 * This function is used to update device type by id
 * 
 * @api PUT /stock-api/device/type/{id}/
 * @param {number} id
 * @param {IDeviceTypeRequest} payload
 * @returns {Promise<BasicResponse>}
 * @throws {Promise<BasicResponse>}
 */
export const updateDeviceTypeAPI = async (id: number, payload: IDeviceTypeRequest): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.put(`/stock-api/device/type/${id}/`, payload);
        console.log("Update device type by id Response", data);
        return data;
    } catch (error: any) {
        console.error("Update device type by id Error", error.response.data);
        throw error.response.data;
    }
}

/**
 * Delete device type by id
 * 
 * This function is used to delete device type by id
 * 
 * @api DELETE /stock-api/device/type/{id}/
 * @param {number} id
 * @returns {Promise<BasicResponse>}
 * @throws {Promise<BasicResponse>}
 */
export const deleteDeviceTypeAPI = async (id: number): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.delete(`/stock-api/device/type/${id}/`);
        console.log("Delete device type by id Response", data);
        return data;
    } catch (error: any) {
        console.error("Delete device type by id Error", error.response.data);
        throw error.response.data;
    }
}

/**
 * Get all device types list
 * 
 * This function is used to get all device types list
 * 
 * @api GET /stock-api/device/type/all/
 * @returns {Promise<BasicResponse>}
 * @throws {Promise<BasicResponse>}
 */

export const getListOfAllDeviceTypesAPI = async (): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.get(`/stock-api/device/type/all/`);
        console.log("Get all device types list Response", data);
        return data;
    } catch (error: any) {
        console.error("Get all device types list Error", error.response.data);
        throw error.response.data;
    }
}
