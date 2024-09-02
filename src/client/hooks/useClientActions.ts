import { useGlobalContext } from "@/context/GlobalProvider";
import { IClientRequest } from "../types/type";
import { useClientContext } from "../contexts/ClientProvider";
import { createClientAPI } from "../ClientService";
import { IMyErrorResponse, IMyResponse } from "@/types";
import { MessageType } from "@/types/Basics";
import { useFetchListOfClients } from "./useClientFetch";


export const useCreateClient = () => {
    // Global states from the context
    const { setAlertOpen, setMessage } = useGlobalContext();
    // Edit states from the context
    const { loading, setLoading } = useClientContext();
    const { fetching, setFetching } = useClientContext();
    const { dialog, setDialog } = useClientContext();
    const { initClientRequest } = useClientContext();
    const { setFieldErrors } = useClientContext();

    // Fetch clients function
    const { pagination, initPagination } = useClientContext();
    const { fetchListOfClients } = useFetchListOfClients();

    const createClient = (request: IClientRequest) => {
        setFetching({ ...fetching, normal: false, filter: false, search: false });
        setLoading({ ...loading, form: true });
        createClientAPI(request)
            .then((res: IMyResponse) => {
                setMessage({
                    message: res.message ? res.message : "Client created successfully",
                    messageType: MessageType.INFO,
                });
                setAlertOpen(true);
                setDialog({ ...dialog, form: false });
                initClientRequest();
                setFetching({ ...fetching, normal: true, filter: false, search: false });
                initPagination();
                fetchListOfClients(pagination.currentPage, pagination.size);
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

    return { createClient };
}