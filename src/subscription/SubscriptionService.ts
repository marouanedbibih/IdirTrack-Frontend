import axiosClient from "@/api/axiosClient";
import { IMyResponse } from "@/types";

// Call the API to get list of subscriptions
export const getListOfSubscriptionsAPI = async (page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/subscriptions?page=${page}&size=${size}`);
        return data;
    } catch (error: any) {
        throw error.respone.data;
    }
}

// Call the API to search for subscriptions
export const searchForSubscriptionsAPI = async (keyword: string, page: number, size: number): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/subscriptions/search?keyword=${keyword}&page=${page}&size=${size}`);
        return data;
    } catch (error: any) {
        throw error.respone.data;
    }
}

// Call the API to get subscription statistics by time left
export const getSubscriptionStatisticsByTimeLeftAPI = async (): Promise<IMyResponse> => {
    try {
        const { data } = await axiosClient.get(`/api/v1/subscriptions/statistics/total-by-time-left`);
        return data;
    } catch (error: any) {
        throw error.respone.data;
    }
}