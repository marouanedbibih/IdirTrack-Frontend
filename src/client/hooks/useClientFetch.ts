/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useClientFunctionsContext } from "../contexts/ClientFunctionsProvider";
import { useClientContext } from "../contexts/ClientProvider";
import { getListOfClientsAPI, searchClientAPI } from "../ClientService";
import { IMyErrorResponse, IMyResponse } from "@/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MessageType } from "@/types/Basics";




// Fetch list of clients
export const useFetchListOfClients = () => {
    // Global states from the context
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Fetch states from the context
    const { data, setData } = useClientContext();
    const { pagination, setPagination } = useClientContext();
    const { loading, setLoading } = useClientContext();
    const { fetching, setFetching } = useClientContext();

    // Fetch clients function
    const fetchListOfClients = (page: number, size: number) => {
        setLoading({ ...loading, table: true });
        setFetching({ ...fetching, normal: true, filter: false, search: false });
        setData(null);
        getListOfClientsAPI(page, size)
            .then((res: IMyResponse) => {
                setData(res.data);
                setPagination({
                    ...pagination,
                    totalPages: res.metadata.totalPages,
                    totalElements: res.metadata.totalElements,
                    currentPage: res.metadata.currentPage,
                    size: res.metadata.size,
                });
            })
            .catch((err: IMyErrorResponse) => {
                console.error(err.message);
                err.message
                    ? setMessage({
                        message: err.message,
                        messageType: MessageType.ERROR
                    })
                    : setMessage({
                        message: "Error while fetching data,Check your internet connection",
                        messageType: MessageType.ERROR
                    });
                setAlertOpen(true);
            })
            .finally(() => setLoading({ ...loading, table: false }));
    }

    // Use effect to fetch clients
    React.useEffect(() => {
        if (fetching.normal) {
            fetchListOfClients(pagination.currentPage, pagination.size);
        }
    }, [pagination.currentPage, pagination.size]);

    return { data, setData, pagination, setPagination, loading, setLoading, fetching, setFetching, fetchListOfClients };
}

// Search client by keyword
export const useSearchClient = () => {
    // Global states from the context
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Fetch states from the context
    const { data, setData } = useClientContext();
    const { pagination, setPagination, initPagination } = useClientContext();
    const { loading, setLoading } = useClientContext();
    const { fetching, setFetching } = useClientContext();
    const { searchKeyword, setSearchKeyword } = useClientContext();

    // Search client function
    const searchClient = (keyword: string, page: number, size: number) => {
        setLoading({ ...loading, table: true });
        setFetching({ ...fetching, search: true, normal: false, filter: false });
        setData(null);
        searchClientAPI(searchKeyword, page, size)
            .then((res: IMyResponse) => {
                if (res.data) {
                    setData(res.data);
                    setPagination({
                        ...pagination,
                        totalPages: res.metadata.totalPages,
                        totalElements: res.metadata.totalElements,
                        currentPage: res.metadata.currentPage,
                        size: res.metadata.size,
                    });
                } else {
                    setData(null);
                    initPagination();
                }
            })
            .catch((err: IMyErrorResponse) => {
                console.error(err.message);
                err.message
                    ? setMessage({
                        message: err.message,
                        messageType: MessageType.ERROR
                    })
                    : setMessage({
                        message: "Error while fetching data,Check your internet connection",
                        messageType: MessageType.ERROR
                    });
                setAlertOpen(true);
            })
            .finally(() => setLoading({ ...loading, table: false }));
    }

    // Use effect to search clients
    React.useEffect(() => {
        if (fetching.search) {
            searchClient(searchKeyword, pagination.currentPage, pagination.size);
        }
    }, [searchKeyword, pagination.currentPage, pagination.size]);

    return { data, setData, pagination, setPagination, loading, setLoading, fetching, initPagination, setSearchKeyword, setFetching };
}