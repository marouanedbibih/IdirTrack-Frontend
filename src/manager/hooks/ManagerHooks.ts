import { useGlobalContext } from "@/context/GlobalProvider";
import { useManagerContext } from "../ManagerProvider"
import { createManagerAPI, deleteManagerAPI, getManagerByIdAPI, getManagersListAPI, updateManagerAPI } from "../ManagerServices";
import { IMyErrorResponse, IMyResponse } from "@/types";
import { MessageType } from "@/types/Basics";
import { IManagerRequest } from "../ManagerTypes";


// Hooks to fetch list of managers
export const useFetchListOfManagers = () => {
    // Importing necessary states from GlobalProvider
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Importing necessary states from ManagerProvider
    const { setManagerList } = useManagerContext();
    const { pagination, setPagination, initPagination } = useManagerContext();
    const { loading, setLoading } = useManagerContext();

    // Function to fetch list of managers
    const fetchListOfManagers = (page: number, size: number) => {
        setLoading({ ...loading, table: true });
        getManagersListAPI(page, size)
            .then((res: IMyResponse) => {
                if (res.data) {
                    setManagerList(res.data);
                    setPagination({
                        ...pagination,
                        currentPage: res.metadata.currentPage,
                        totalPages: res.metadata.totalPages,
                        size: res.metadata.size,
                        totalElements: res.metadata.totalElements,
                    });
                } else {
                    setManagerList(null);
                    initPagination();
                }
            })
            .catch((err: IMyErrorResponse) => {
                setMessage({
                    message: err.message ? err.message : "Error Fetching Managers, Please Try Again",
                    messageType: MessageType.ERROR,
                })
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false });
            });

    };

    // Return Function
    return { fetchListOfManagers };
}

// Hooks to fetch manager by ID 
export const useFetchManagerByID = () => {
    // Importing necessary states from GlobalProvider
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Importing necessary states from ManagerProvider
    const { setManagerRequest } = useManagerContext();
    const { loading, setLoading } = useManagerContext();

    // Function to fetch manager by ID
    const fetchManagerByID = (id: number) => {
        setLoading({ ...loading, form: true });
        getManagerByIdAPI(id)
            .then((res: IMyResponse) => {
                setManagerRequest(res.data);
            })
            .catch((err: IMyErrorResponse) => {
                setMessage({
                    message: err.message ? err.message : "Error Fetching Manager, Please Try Again",
                    messageType: MessageType.ERROR,
                })
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    // Return Function
    return { fetchManagerByID };
}

// Hooks to create a new manager
export const useCreateManager = () => {
    // Importing necessary states from GlobalProvider
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Importing necessary states from ManagerProvider
    const { pagination } = useManagerContext();
    const { loading, setLoading } = useManagerContext();
    const {dialog, setDialog} = useManagerContext();
    const { resetManagerRequest } = useManagerContext();

    // Importing the fetchListOfManagers function
    const { fetchListOfManagers } = useFetchListOfManagers();

    // Function to create a new manager
    const createManager = (manager: IManagerRequest) => {
        setLoading({ ...loading, form: true });
        createManagerAPI(manager)
            .then((res: IMyResponse) => {
                setDialog({ ...dialog, form: false });
                resetManagerRequest();
                fetchListOfManagers(pagination.currentPage, pagination.size);
                setMessage({
                    message: res.message ? res.message : "Manager Created Successfully",
                    messageType: MessageType.SUCCESS,
                })
                setAlertOpen(true);
            })
            .catch((err: IMyErrorResponse) => {
                setMessage({
                    message: err.message ? err.message : "Error Creating Manager, Please Try Again",
                    messageType: MessageType.ERROR,
                })
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    // Return Function
    return { createManager };
}

// Hooks to update a manager
export const useUpdateManager = () => {
    // Importing necessary states from GlobalProvider
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Importing necessary states from ManagerProvider
    const { pagination } = useManagerContext();
    const { loading, setLoading } = useManagerContext();
    const { IID, setIID } = useManagerContext();
    const { dialog, setDialog } = useManagerContext();

    // Importing the fetchListOfManagers function
    const { fetchListOfManagers } = useFetchListOfManagers();

    // Function to update a manager
    const updateManager = (id: number, manager: IManagerRequest) => {
        setLoading({ ...loading, form: true });
        updateManagerAPI(id, manager)
            .then((res: IMyResponse) => {
                setDialog({ ...dialog, form: false });
                setIID({ ...IID, update: null });
                fetchListOfManagers(pagination.currentPage, pagination.size);
                setMessage({
                    message: res.message ? res.message : "Manager Updated Successfully",
                    messageType: MessageType.SUCCESS,
                })
                setAlertOpen(true);
            })
            .catch((err: IMyErrorResponse) => {
                setMessage({
                    message: err.message ? err.message : "Error Updating Manager, Please Try Again",
                    messageType: MessageType.ERROR,
                })
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, form: false });
            });
    };

    // Return Function
    return { updateManager };
}

// Hooks to delete a manager
export const useDeleteManager = () => {
    // Importing necessary states from GlobalProvider
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Importing necessary states from ManagerProvider
    const { pagination } = useManagerContext();
    const { loading, setLoading } = useManagerContext();
    const {dialog, setDialog} = useManagerContext();
    const { IID, setIID } = useManagerContext();

    // Importing the fetchListOfManagers function
    const { fetchListOfManagers } = useFetchListOfManagers();

    // Function to delete a manager
    const deleteManager = (id: number) => {
        setLoading({ ...loading, table: true });
        deleteManagerAPI(id)
            .then((res: IMyResponse) => {
                setDialog({ ...dialog, delete: false });
                setIID({ ...IID, delete: null });
                fetchListOfManagers(pagination.currentPage, pagination.size);
                setMessage({
                    message: res.message ? res.message : "Manager Deleted Successfully",
                    messageType: MessageType.SUCCESS,
                })
                setAlertOpen(true);
            })
            .catch((err: IMyErrorResponse) => {
                setMessage({
                    message: err.message ? err.message : "Error Deleting Manager, Please Try Again",
                    messageType: MessageType.ERROR,
                })
                setAlertOpen(true);
            })
            .finally(() => {
                setLoading({ ...loading, table: false });
            });
    };

    // Return Function
    return { deleteManager };
}

