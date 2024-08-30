import axiosClient from "@/api/axiosClient"
import { IMyResponse } from "@/operators/types"

// Get list of clients for dropdown
export const getClientsForDropdown = async (): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get('/api/clients/dropdown');
        return data;
    } catch (error: any) {
        return error.response.data;
    }
}

// 