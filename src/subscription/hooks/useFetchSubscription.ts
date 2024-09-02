/* eslint-disable react-hooks/exhaustive-deps */
import { IMyResponse } from "@/types";
import { useSubscriptionContext } from "../contexts/SubscriptionProvider";
import { getListOfSubscriptionsAPI, getSubscriptionStatisticsByTimeLeftAPI, searchForSubscriptionsAPI } from "../SubscriptionService";
import { useGlobalContext } from "@/context/GlobalProvider";
import { MessageType } from "@/types/Basics";
import React from "react";

// Custome Hook to fetch list of subscriptions with pagination
export const useFetchListOfSubscriptions = () => {
    // Import the necessary states from the context
    const { fetching,
        setFetching,
        subscriptionsList,
        setSubscriptionsList,
        loading,
        setLoading,
        pagination,
        setPagination,
        initPagination,
    } = useSubscriptionContext();
    // Import Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();

    // Fetch data from the API
    const fetchListOfSubscriptions = (page: number, size: number) => {
        setFetching({ ...fetching, normal: true, search: false, filter: false });
        setLoading({ ...loading, table: true });
        getListOfSubscriptionsAPI(page, size)
            .then((res: IMyResponse) => {
                if (res.data) {
                    setSubscriptionsList(res.data);
                    setPagination({
                        ...pagination,
                        currentPage: res.metadata.currentPage,
                        totalPages: res.metadata.totalPages,
                        size: res.metadata.size,
                    });
                } else {
                    setSubscriptionsList(null);
                    initPagination();
                }
            })
            .catch((err) => {
                console.error(err);
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
            .finally(() => {
                setLoading({ ...loading, table: false });
            });
    }

    // UseEffect to fetch data when the component is mounted
    React.useEffect(() => {
        if (fetching.normal) {
            fetchListOfSubscriptions(pagination.currentPage, pagination.size);
        }
    }, [pagination.currentPage, pagination.size, fetching.normal]);

    return { fetchListOfSubscriptions, loading, subscriptionsList, pagination, setPagination };
}

// Custom Hook to search for subscriptions
export const useSearchForSubscriptions = () => {
    // Import the necessary states from the context
    const { fetching,
        setFetching,
        subscriptionsList,
        setSubscriptionsList,
        loading,
        setLoading,
        pagination,
        setPagination,
        initPagination,
        searchKeyword,
        setSearchKeyword
    } = useSubscriptionContext();
    // Import Global Context
    const { setAlertOpen, setMessage } = useGlobalContext();

    // Fetch data from the API
    const searchForSubscriptions = (keyword: string, page: number, size: number) => {
        // setFetching({ ...fetching, search: true, normal: false, filter: false });
        setLoading({ ...loading, table: true });
        console.log(keyword)
        searchForSubscriptionsAPI(keyword, page, size)
            .then((res: IMyResponse) => {
                if (res.data) {
                    setSubscriptionsList(res.data);
                    setPagination({
                        ...pagination,
                        currentPage: res.metadata.currentPage,
                        totalPages: res.metadata.totalPages,
                        size: res.metadata.size,
                        totalElements: res.metadata.totalElements,
                    });
                } else {
                    setSubscriptionsList(null);
                    initPagination();
                }
            })
            .catch((err) => {
                console.error(err);
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
            .finally(() => {
                setLoading({ ...loading, table: false });
            });
    }

    // UseEffect to fetch data when the component is mounted
    React.useEffect(() => {
        if (fetching.search) {
            searchForSubscriptions(searchKeyword, pagination.currentPage, pagination.size);
        }
    }, [pagination.currentPage, pagination.size, fetching.search, searchKeyword]);

    return { searchForSubscriptions, loading, subscriptionsList, pagination, setPagination, setSearchKeyword, setFetching, initPagination };
}


// Custom Hook to fetch subscription statistics by time left
export const useFetchSubscriptionStatisticsByTimeLeft = () => {
    const [tableLoading, setTableLoading] = React.useState<boolean>(false);
    const [data, setData] = React.useState<any[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const { setAlertOpen, setMessage } = useGlobalContext();

    // Fetch subscription statistics by time left
    const fetchSubscriptionStatisticsByTimeLeft = async () => {
        setTableLoading(true);
        getSubscriptionStatisticsByTimeLeftAPI()
            .then((res: IMyResponse) => {
                setData([
                    {
                        status: "current",
                        totalSubscriptions: res.data.current,
                    },
                    {
                        status: "close",
                        totalSubscriptions: res.data.close,
                    },
                    {
                        status: "left",
                        totalSubscriptions: res.data.left,
                    },
                ]);
                setTotal(res.data.total);
            })
            .catch((err) => {
                console.error("Get subscription statistics by time left Error", err);
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
            .finally(() => {
                setTableLoading(false);
            });

    };

    React.useEffect(() => {
        fetchSubscriptionStatisticsByTimeLeft();
    }, []);

    return { tableLoading, data, total };

}