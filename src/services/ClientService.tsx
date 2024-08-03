import axiosClient from "@/api/axiosClient";
import { BasicResponse } from "@/types/Basics";

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
