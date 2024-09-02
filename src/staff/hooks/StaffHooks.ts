/* eslint-disable react-hooks/exhaustive-deps */
import { IMyErrorResponse, IMyResponse } from "@/types";
import { useStaffContext } from "../StaffProvider"
import { createStaffAPI, deleteStaffAPI, getListOfStaffsListAPI, getStaffByIdAPI, searchStaffsAPI } from "../StaffServices";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MessageType } from "@/types/Basics";
import React from "react";
import { StaffRequest } from "../type";
import { set } from "date-fns";


// Hooks to fetch the list of staffs
export const useFetchListOfStaffs = () => {
    // Import the necessary state from the Global Provider
    const { setMessage, setAlertOpen } = useGlobalContext();
    // Import the necessary state from the provider
    const { fetching, setFetching } = useStaffContext();
    const { loading, setLoading } = useStaffContext();
    const { setStaffList } = useStaffContext();
    const { pagination, setPagination, initPagination } = useStaffContext();

    // Fetch the list of staffs
    const fetchListOfStaffs = async (page: number, size: number) => {
        setFetching({ ...fetching, normal: true, search: false, filter: false });
        setLoading({ ...loading, table: true, form: false, delete: false });
        // Call the API to get the list of staffs
        getListOfStaffsListAPI(page, size)
            .then((res: IMyResponse) => {
                if (res.data) {
                    setStaffList(res.data);
                    setPagination({
                        ...pagination,
                        size: res.metadata.size,
                        totalElements: res.metadata.totalElements,
                        totalPages: res.metadata.totalPages,
                        currentPage: res.metadata.currentPage
                    });
                } else {
                    setStaffList([]);
                    initPagination();
                }
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error Fetching Staffs", err);
                setStaffList(null);
                initPagination();
                setMessage({
                    message: err.message ? err.message : "Error Fetching Staffs, Please try again",
                    messageType: MessageType.ERROR
                });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, delete: false });
            })
    }

    // UseEffect to fetch the list of staffs
    React.useEffect(() => {
        if (fetching.normal) {
            fetchListOfStaffs(pagination.currentPage, pagination.size);
        }
    }, [pagination.currentPage, pagination.size, fetching.normal]);

    // Return the function to fetch the list of staffs
    return fetchListOfStaffs;

}

// Hooks to search for staffs
export const useSearchStaffs = () => {
    // Import the necessary state from the Global Provider
    const { setMessage, setAlertOpen } = useGlobalContext();
    // Import the necessary state from the provider
    const { fetching, setFetching } = useStaffContext();
    const { loading, setLoading } = useStaffContext();
    const { setStaffList } = useStaffContext();
    const { pagination, setPagination, initPagination } = useStaffContext();
    const { search } = useStaffContext();

    // Call the API to search for staffs
    const searchStaffs = async (search: string, page: number, size: number) => {
        setFetching({ ...fetching, normal: false, search: true, filter: false });
        setLoading({ ...loading, table: true, form: false, delete: false });
        searchStaffsAPI(search, page, size)
            .then((res: IMyResponse) => {
                if (res.data) {
                    setStaffList(res.data);
                    setPagination({
                        ...pagination,
                        size: res.metadata.size,
                        totalElements: res.metadata.totalElements,
                        totalPages: res.metadata.totalPages,
                        currentPage: res.metadata.currentPage
                    });
                } else {
                    setStaffList([]);
                    initPagination();
                }
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error Searching Staffs", err);
                setStaffList(null);
                initPagination();
                setMessage({
                    message: err.message ? err.message : "Error Searching Staffs, Please try again",
                    messageType: MessageType.ERROR
                });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, delete: false });
            })
    }

    // UseEffect to search for staffs
    React.useEffect(() => {
        if (fetching.search) {
            searchStaffs(search, pagination.currentPage, pagination.size);
        }
    }, [search, pagination.currentPage, pagination.size, fetching.search]);

    // Return the function to search for staffs
    return searchStaffs;
}

// Hook to Fetch staff by ID
export const useFetchStaffById = () => {
    // Import the necessary state from the Global Provider
    const { setMessage, setAlertOpen } = useGlobalContext();
    // Import the necessary state from the provider
    const { loading, setLoading } = useStaffContext();
    const { setStaffRequest, resetStaffRequest } = useStaffContext();


    // Call the API to get a staff by id
    const fetchStaffById = async (id: number) => {
        setLoading({ ...loading, table: false, form: true, delete: false });
        getStaffByIdAPI(id)
            .then((res: IMyResponse) => {
                res.data
                    ? setStaffRequest(res.data)
                    : resetStaffRequest();
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error Fetching Staff", err);
                setMessage({
                    message: err.message ? err.message : "Error Fetching Staff, Please try again",
                    messageType: MessageType.ERROR
                });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, delete: false });
            })
    }

    // Return the function to fetch staff by id
    return fetchStaffById;

}

// Hook to Create a staff
export const useCreateStaff = () => {
    // Import the necessary state from the Global Provider
    const { setMessage, setAlertOpen } = useGlobalContext();
    // Import the necessary state from the provider
    const { loading, setLoading } = useStaffContext();
    const { dialog, setDialog } = useStaffContext();
    const { setFetching } = useStaffContext();
    const { pagination, initPagination } = useStaffContext();
    const { resetStaffRequest } = useStaffContext();
    const { setFieldErrors } = useStaffContext();
    // Import the fetchListOfStaffs function from the useFetchListOfStaffs hook
    const fetchListOfStaffs = useFetchListOfStaffs();

    // Call the API to create a staff
    const createStaff = async (request: StaffRequest) => {
        setLoading({ ...loading, table: false, form: true, delete: false });
        createStaffAPI(request)
            .then((res: IMyResponse) => {
                setMessage({
                    message: res.message ? res.message : "Staff Created Successfully",
                    messageType: MessageType.SUCCESS
                });
                setAlertOpen(true);
                setDialog({ ...dialog, form: false });
                resetStaffRequest();
                setFetching({ normal: true, search: false, filter: false });
                initPagination();
                fetchListOfStaffs(pagination.currentPage, pagination.size);
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error Creating Staff", err);
                setMessage({
                    message: err.message ? err.message : "Error Creating Staff, Please try again",
                    messageType: MessageType.ERROR
                });
                setAlertOpen(true);
                setFieldErrors(err.fieldErrors);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, delete: false });
            });
    }

    // Return the function to create a staff
    return createStaff;
}

// Hook to Update a staff
export const useUpdateStaff = () => {
    // Import the necessary state from the Global Provider
    const { setMessage, setAlertOpen } = useGlobalContext();
    // Import the necessary state from the provider
    const { loading, setLoading } = useStaffContext();
    const { dialog, setDialog } = useStaffContext();
    const { setFetching } = useStaffContext();
    const { pagination, initPagination } = useStaffContext();
    const { resetStaffRequest } = useStaffContext();
    const { IID, setIID } = useStaffContext();
    const { setFieldErrors } = useStaffContext();
    // Import the fetchListOfStaffs function from the useFetchListOfStaffs hook
    const fetchListOfStaffs = useFetchListOfStaffs();

    // Call the API to update a staff
    const updateStaff = async (id: number, request: StaffRequest) => {
        setLoading({ ...loading, table: false, form: true, delete: false });
        createStaffAPI(request)
            .then((res: IMyResponse) => {
                setMessage({
                    message: res.message ? res.message : "Staff Updated Successfully",
                    messageType: MessageType.SUCCESS
                });
                setAlertOpen(true);
                setDialog({ ...dialog, form: false });
                resetStaffRequest();
                setFetching({ normal: true, search: false, filter: false });
                initPagination();
                fetchListOfStaffs(pagination.currentPage, pagination.size);
                setIID({ ...IID, update: null });
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error Updating Staff", err);
                setMessage({
                    message: err.message ? err.message : "Error Updating Staff, Please try again",
                    messageType: MessageType.ERROR
                });
                setAlertOpen(true);
                setFieldErrors(err.fieldErrors);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, delete: false });
            });
    }

    // Return the function to update a staff
    return updateStaff;
}

// Hook to Delete a staff
export const useDeleteStaff = () => {
    // Import the necessary state from the Global Provider
    const { setMessage, setAlertOpen } = useGlobalContext();
    // Import the necessary state from the provider
    const { loading, setLoading } = useStaffContext();
    const { dialog, setDialog } = useStaffContext();
    const { setFetching } = useStaffContext();
    const { pagination, initPagination } = useStaffContext();
    const { IID, setIID } = useStaffContext();
    // Import the fetchListOfStaffs function from the useFetchListOfStaffs hook
    const fetchListOfStaffs = useFetchListOfStaffs();

    // Call the API to delete a staff
    const deleteStaff = async (id: number) => {
        setLoading({ ...loading, table: false, form: false, delete: true });
        deleteStaffAPI(id)
            .then((res: IMyResponse) => {
                setMessage({
                    message: res.message ? res.message : "Staff Deleted Successfully",
                    messageType: MessageType.SUCCESS
                });
                setAlertOpen(true);
                setDialog({ ...dialog, delete: false });
                setFetching({ normal: true, search: false, filter: false });
                initPagination();
                fetchListOfStaffs(pagination.currentPage, pagination.size);
                setIID({ ...IID, delete: null });
            })
            .catch((err: IMyErrorResponse) => {
                console.error("Error Deleting Staff", err);
                setMessage({
                    message: err.message ? err.message : "Error Deleting Staff, Please try again",
                    messageType: MessageType.ERROR
                });
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false, form: false, delete: false });
            });
    }

    // Return the function to delete a staff
    return deleteStaff;
}