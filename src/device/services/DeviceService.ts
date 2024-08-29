import axiosClient from "@/api/axiosClient";
import { IResponse } from "@/types/Basics";
import { IDeviceFilter, IDeviceRequest } from "../types/Device";
import { IMyResponse } from "@/operators/types";

/**
 * Call API to get the list of devices
 * @api GET /api/device/?page=1&size=10
 * @param page 
 * @param size 
 * @returns {Promise<IResponse>}
 */
export const getDeviceListAPI = async (page: number, size: number): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/device/?page=${page}&size=${size}`);
        console.log("Device  list data ", data);
        return data;
    } catch (error: any) {
        console.error("Device types list error", error.response.data);
        throw error.response.data;
    }
}

/**
 * Call API to create a new device
 * 
 * This function is used to create a new device
 * 
 * @api POST /api/device/
 * @param {IDeviceRequest} payload
 * @returns {Promise<IResponse>}
 */
export const createDeviceAPI = async (payload: IDeviceRequest): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.post("/api/device/", payload);
        console.error("Create device data ", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Create device error", data);
        throw data;
    }
}

/**
 * Call API to delete a device
 * 
 * This function is used to delete a device by id
 * 
 * @api DELETE /api/device/{id}/
 * @param {number} id
 * @returns {Promise<IResponse>}
 */
export const deleteDeviceAPI = async (id: number): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.delete(`/api/device/${id}/`);
        console.error("Delete device data ", data);
        return data;
    } catch (error: any) {
        const data = error.response.data;
        console.error("Delete device error", data);
        throw data;
    }
}

/**
 * Call API to get a device by id
 * 
 * This function is used to get a device by id
 * 
 * @param {number} id
 * @returns {Promise<IResponse>}
 */
export const getDeviceByIdAPI = async (id: number): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/device/${id}/`);
        console.error("Get device by id data ", data);
        return data;
    } catch (error: any) {
        const data: IResponse = error.response.data;
        console.error("Get device by id error", data);
        throw data;
    }
}

/**
 * Call API to update a device
 * 
 * This function is used to update a device by id
 * 
 * @api PUT /api/device/{id}/
 * @param {number} id
 * @param {IDeviceRequest} payload
 * @returns {Promise<IResponse>}
 * @throws {Promise<IResponse>}
 */
export const updateDeviceAPI = async (id: number, payload: IDeviceRequest): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.put(`/api/device/${id}/`, payload);
        console.error("Update device data ", data);
        return data;
    } catch (error: any) {
        console.error("Update device error", error.response.data);
        throw error.response.data;
    }

}


/**
 * Call API to get the total devices count
 * 
 * This function is used to get the total devices count
 * 
 * @api GET /api/device/type/total
 * @returns {Promise<number>}
 * @throws {Promise<IResponse>}
 */
export const getTotalDevicesCountAPI = async (): Promise<number> => {
    try {
        const { data } = await axiosClient.get(`/api/device/total/`);
        console.log("Get total devices count Response", data);
        return data.content;
    } catch (error: any) {
        console.error("Get total devices count Error", error.response.data);
        throw error.response.data;
    }
}

/**
 * Call API to get total device and group by status
 * 
 * This function is used to get the total device and group by status
 * 
 * @api GET /api/device/quantity-of-status/
 * @returns {Promise<IResponse>}
 * @throws {Promise<IResponse>}
 */
export const getDeviceQuantityOfStatusAPI = async (): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/device/quantity-of-status/`);
        console.log("Get device quantity of status Response", data);
        return data;
    } catch (error: any) {
        console.error("Get device quantity of status Error", error.response.data);
        throw error.response.data;
    }

}

/**
 * Call API to search devices by saerch key
 * 
 * This function is used to search devices by search key
 * 
 * @api GET /api/device/search/?search=abc&page=1&size=10
 * @param {string} search
 * @param {number} page
 * @param {number} size
 * @returns {Promise<IResponse>}
 * @throws {Promise<IResponse>}
 */

export const searchDevicesAPI = async (search: string, page: number, size: number): Promise<IResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/device/search/?search=${search}&page=${page}&size=${size}`);
        console.log("Search devices Response", data);
        return data;
    } catch (error: any) {
        console.error("Search devices Error", error.response.data);
        throw error.response.data;
    }

}

/**
 * Call API to filter devices by status, type, createdFrom and createdTo
 * 
 * @api GET /api/device/filter/?status=abc&type=1&createdFrom=2021-09-01&createdTo=2021-09-30&page=1&size=10
 * 
 * @param {IDeviceFilter} filter
 * @param {number} page
 * @param {number} size
 * @returns {Promise<IResponse>}
 * @throws {Promise<IResponse>}
 */

export const filterDevicesAPI = async (
    filter: IDeviceFilter,
    page: number,
    size: number
): Promise<IResponse> => {
    try {
        const queryParams = buildQueryParams({
            status: filter.status,
            type: filter.type,
            createdFrom: filter.createdFrom,
            createdTo: filter.createdTo,
            page: page,
            size: size,
        });

        // Make the API request with the dynamic query string
        const { data } = await axiosClient.get(`/api/device/filter/?${queryParams}`);
        console.log("Filter devices Response", data);
        return data;
    } catch (error: any) {
        console.error("Filter devices Error", error.response.data);
        throw error.response.data;
    }
}



/**
 * Build query params
 * 
 * This function is used to build query params
 * 
 * @param {Object} params
 * @returns {string}
 */
const buildQueryParams = (params: { [key: string]: any }) => {
    const query = new URLSearchParams();
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== "") {
            query.append(key, params[key]);
        }
    });
    return query.toString();
};


// Get List of devices non installed
export const getNonInstalledDevices = async (page:number,size:number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/device/non-installed/?page=${page}&size=${size}`);
        console.log("Get non installed devices Response", data);
        return data;
    } catch (error: any) {
        console.error("Get non installed devices Error", error.response.data);
        throw error.response.data;
    }
}

// Search devices non installed
export const searchNonInstalledDevices = async (query: string, page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/device/non-installed/search/?query=${query}&page=${page}&size=${size}`);
        console.log("Search non installed devices Response", data);
        return data;
    } catch (error: any) {
        console.error("Search non installed devices Error", error.response.data);
        throw error.response.data;
    }
}



