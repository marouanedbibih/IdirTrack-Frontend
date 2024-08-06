import axiosClient from "@/api/axiosClient";
import { BasicResponse, Response } from "@/types/Basics";

const CLIENT_API = process.env.NEXT_PUBLIC_CLIENT_API;

/**
 * Get client details by ID
 * @api GET /client/:id
 * @param id - The client ID
 * @returns BasicResponse
 * @throws error
 */

export const getClientById = async (id: number): Promise<BasicResponse> => {
  try {
    const { data } = await axiosClient.get(`${CLIENT_API}/${id}/`);
    return data;
  } catch (error: any) {
    const { data } = error.response.data;
    throw data;
  }
};

/**
 * Get client for select
 * This function is used to retrieve list of cliens informations 
 * like id, name and company for select input
 * 
 * @api GET /user-api/list-for-create-vehicle/
 * @param page - The page number
 * @param size - The page size
 * @returns BasicResponse
 */

export const getClientForSelect = async (page: number, size: number): Promise<BasicResponse> => {
  try {
    const { data } = await axiosClient.get(`${CLIENT_API}/list-client-for-select/?page=${page}&size=${size}`);
    return data;
  } catch (error: any) {
    const { data } = error.response.data;
    throw data;
  }
}

/**
 * SEARCH CLIENT FOR SELECT
 * 
 * This function is used to search for clients by name or company
 * Call the API to search for clients by name or company
 * Then return a list of clients for select input
 * 
 * @api GET /user-api/search-client-for-select/
 * @param term - The search term
 * @param page - The page number
 * @param size - The page size
 */

export const searchClientForSelect = async (term: string, page: number, size: number): Promise<Response> => {
  // Try to get the data from the API
  try {
    const { data } = await axiosClient.get(`${CLIENT_API}/list-client-for-select/search/?term=${term}&page=${page}&size=${size}`);
    console.log("data", data);
    return data;
  }
  // Catch any error and throw the error message
  catch (error: any) {
    throw error.response.data;
  }
}

