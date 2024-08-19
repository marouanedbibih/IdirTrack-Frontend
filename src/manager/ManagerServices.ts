import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";
import { IManagerRequest } from "./ManagerTypes";
/**
 * Fetch all Managers with pagination
 * 
 * @api /user-api/manager/
 * @param {number} page
 * @param {number} size
 * @returns {Promise<BasicResponse>}
 * @throws {BasicResponse}
 */
export const getAllManagersListAPI = async (page: number, size: number): Promise<BasicResponse> => {

    try {
        const { data } = await axiosClient.get(`/user-api/manager/?page=${page}&size=${size}`);
        console.log("Manager List: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Fetching Manager List: ", error.response.data);
        throw error.response.data;
    }

}

/**
 * Call API to create a new Manager
 * @api /user-api/manager/
 * @method POST
 * @param {IManagerRequest} Manager The Manager request object
 * @returns {Promise<BasicResponse>}
 * @throws {BasicResponse}
 */

export const createManagerAPI = async (Manager: IManagerRequest): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.post(`/user-api/manager/`, Manager);
        console.log("Manager Created: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Creating Manager: ", error.response.data);
        throw error.response.data;
    }
}

/**
 * Call API to get manager by id
 * @api /user-api/manager/{id}/
 * @method get
 * @param {number} id
 * @returns {Promise<BasicResponse>}
 * @throws {BasicResponse}
 */
export const getManagerByIdAPI = async (id: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/user-api/manager/${id}/`);
        console.log("Manager: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Fetching Manager: ", error.response.data);
        throw error.response.data;
    }
}

/**
 * Call API to update manager by id
 * @api /user-api/manager/{id}/
 * @method PUT
 * @param {number} id
 * @param {IManagerRequest} Manager The Manager request object
 * @returns {Promise<BasicResponse>}
 * @throws {BasicResponse}
 */

export const updateManagerAPI = async (id: number, Manager: IManagerRequest): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.put(`/user-api/manager/${id}/`, Manager);
        console.log("Manager Updated: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Updating Manager: ", error.response.data);
        throw error.response.data;
    }
}

/**
 * Call API to delete manager by id
 * @api /user-api/manager/{id}/
 * @method DELETE
 * @param {number} id
 * @returns {Promise<BasicResponse>}
 * @throws {BasicResponse}
 */

export const deleteManagerAPI = async (id: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.delete(`/user-api/manager/${id}/`);
        console.log("Manager Deleted: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Deleting Manager: ", error.response.data);
        throw error.response.data;
    }
}

/**
 * Call API to search manager by search value
 * @api /user-api/manager/search/
 * @method GET
 * @param {string} search
 * @param {number} page
 * @param {number} size
 * @returns {Promise<BasicResponse>}
 * @throws {BasicResponse}
 */

export const searchManagersAPI = async (search: string, page: number, size: number): Promise<BasicResponse> => {
    try {
        const { data } = await axiosClient.get(`/user-api/manager/search/?search=${search}&page=${page}&size=${size}`);
        console.log("Manager Searched: ", data);
        return data;
    } catch (error: any) {
        console.log("Error Searching Manager: ", error.response.data);
        throw error.response.data;
    }
}

