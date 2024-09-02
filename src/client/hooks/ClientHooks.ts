/* eslint-disable react-hooks/exhaustive-deps */
import React, { use } from "react";
import { useClientContext } from "../contexts/ClientProvider";
import { createClientAPI, deleteClientAPI, getClientByIdAPI, getListOfClientsAPI, searchClientAPI, updateClientAPI } from "../ClientService";
import { IMyErrorResponse, IMyResponse } from "@/types";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MessageType } from "@/types/Basics";
import { IClientRequest } from "../types/type";




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

    return { fetchListOfClients };
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

    return { data, setData, pagination, setPagination, loading, setLoading, fetching, initPagination, setSearchKeyword, setFetching, searchClient };
}

// Hook to create a new client
export const useCreateClient = () => {
    // Global states from the context
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Import the necessary states and functions from the context
    const { loading, setLoading } = useClientContext();
    const { dialog, setDialog } = useClientContext();
    const { initClientRequest } = useClientContext();
    const { pagination, setPagination } = useClientContext();
    const { setFieldErrors } = useClientContext();

    // Import Function to reFetch data from hooks
    const {reFetchData} = useReFetchData();

    const createClient = (request: IClientRequest) => {
        setLoading({ ...loading, form: true });
        createClientAPI(request)
            .then((res: IMyResponse) => {
                setDialog({ ...dialog, form: false });
                initClientRequest();
                setMessage({
                    message: res.message ? res.message : "Client created successfully",
                    messageType: MessageType.INFO,
                });
                setAlertOpen(true);
                reFetchData();
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error creating client", err);
                setMessage({
                    message: err.message ? err.message : "Error creating client",
                    messageType: MessageType.ERROR,
                });
                setFieldErrors(err.fieldErrors);
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    // Return the function to create a client
    return { createClient };
}

// Hook to update a client
export const useUpdateClient = () => {
    // Global states from the context
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Import the necessary states and functions from the context
    const { loading, setLoading } = useClientContext();
    const { dialog, setDialog } = useClientContext();
    const { initClientRequest } = useClientContext();
    const { pagination, setPagination } = useClientContext();
    const { setFieldErrors } = useClientContext();
    const { IIDs, setIIDs } = useClientContext();

    // Import Function to reFetch data from hooks
    const {reFetchData} = useReFetchData();

    // Call the update client API
    const updateClient = (id: number, request: IClientRequest) => {
        setLoading({ ...loading, form: true });
        updateClientAPI(id, request)
            .then((res: IMyResponse) => {
                setDialog({ ...dialog, form: false });
                initClientRequest();
                setIIDs({ ...IIDs, update: null });
                setMessage({
                    message: res.message ? res.message : "Client updated successfully",
                    messageType: MessageType.INFO,
                });
                setAlertOpen(true);
                reFetchData();
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error updating client", err);
                setMessage({
                    message: err.message ? err.message : "Error updating client",
                    messageType: MessageType.ERROR,
                });
                setFieldErrors(err.fieldErrors);
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    // Return the function to update a client
    return { updateClient };
}

// Hook to fetch a client by ID
export const useFetchClientById = () => {
    // Global states from the context
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Import the necessary states and functions from the context
    const { loading, setLoading } = useClientContext();
    const { setClientRequest } = useClientContext();

    // Call the fetch client by ID API
    const fetchClientById = (id: number) => {
        setLoading({ ...loading, form: true });
        getClientByIdAPI(id)
            .then((res: IMyResponse) => {
                setClientRequest(res.data);
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error fetching client", err);
                setMessage({
                    message: err.message ? err.message : "Error fetching client",
                    messageType: MessageType.ERROR,
                });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    // Return the function to fetch a client by ID
    return { fetchClientById };
}

// Hook to delete a client
export const useDeleteClient = () => {
    // Import the necessary states and functions from the Global context
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Import the necessary states and functions from the context
    const { loading, setLoading } = useClientContext();
    const { dialog, setDialog } = useClientContext();
    const { pagination, setPagination } = useClientContext();
    const { IIDs, setIIDs } = useClientContext();
    
    // Import Function to reFetch data from hooks
    const {reFetchData} = useReFetchData();

    // Call the delete client API
    const deleteClient = (id: number) => {
        setLoading({ ...loading, delete: true });
        deleteClientAPI(id)
            .then((res: IMyResponse) => {
                setDialog({ ...dialog, delete: false });
                setIIDs({ ...IIDs, delete: null });
                setMessage({
                    message: res.message ? res.message : "Client deleted successfully",
                    messageType: MessageType.INFO,
                });
                setAlertOpen(true);
                reFetchData();
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error deleting client", err);
                setMessage({
                    message: err.message ? err.message : "Error deleting client",
                    messageType: MessageType.ERROR,
                });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, delete: false });
            });
    };

    // Return the function to delete a client
    return { deleteClient };
}



export const useReFetchData = () => {
    // Access the necessary states from the context
    const { fetching, setFetching } = useClientContext();
    const { pagination, setPagination } = useClientContext();
    const { searchKeyword, setSearchKeyword } = useClientContext();

    // Import functions to fetch clients from hooks
    const { fetchListOfClients } = useFetchListOfClients();
    const { searchClient } = useSearchClient();

    // Function to re-fetch data
    const reFetchData = () => {
        if (fetching.search) {
            searchClient(searchKeyword, pagination.currentPage, pagination.size);
        } else if (fetching.normal) {
            fetchListOfClients(pagination.currentPage, pagination.size);
        }
    };

    return { reFetchData };
};
