import { IDisplayStatus, IMyErrResponse, IPagination } from "@/types";
import { IVehicle, OBJVehicle } from "../VehicleTypes";
import React from "react";
import { size } from "@material-tailwind/react/types/components/avatar";
import { getListOfVehicleAPI, searchVehicleAPI } from "../services/VehicleService";
import { IMyResponse } from "@/operators/types";

interface IUseVehicle {
    displayStatus: IDisplayStatus;
    search: string;
    pagination: IPagination;
}


const useVehicle = (props: IUseVehicle) => {
    // States
    const [data, setData] = React.useState<OBJVehicle[] | null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState<string | null>(null);

    // Fetch list of vehicles
    const fetchVehicles = async (page: number, size: number) => {
        setLoading(true);
        getListOfVehicleAPI(page, size)
            .then((res: IMyResponse) => {
                res.data
                    ? setData(res.data)
                    : (setData(null), setMessage("No data found"));
            })
            .catch((err: IMyErrResponse) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // Search vehicle by query
    const searchVehicle = async (term: string, page: number, size: number) => {
        setLoading(true);
        searchVehicleAPI(term, page, size)
            .then((res: IMyResponse) => {
                res.data
                    ? setData(res.data)
                    : (setData(null), setMessage("No data found"));
            })
            .catch((err: IMyErrResponse) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // Use effect
    React.useEffect(() => {
        if (props.displayStatus.search && props.search) {
            searchVehicle(props.search, props.pagination.currentPage, props.pagination.size);
        } else {
            fetchVehicles(props.pagination.currentPage, props.pagination.size);
        }
    }, [props.displayStatus.search, props.search, props.pagination.currentPage, props.pagination.size]);

    return {
        data,
        loading,
        error,
        message,
    }
}

export default useVehicle;