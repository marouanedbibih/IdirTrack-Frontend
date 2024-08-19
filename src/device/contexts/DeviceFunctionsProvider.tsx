/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import {
  DeviceFormData,
  DeviceInterface,
  DeviceTypeInterface,
} from "../DeviceTypeScript";

import {
  BasicResponse,
  IResponse,
  MessageInterface,
  MessageType,
} from "@/types/Basics";
import { DynamicAlert } from "@/components/alert/DynamicAlert";
import { IDevice, IDeviceFilter, IDeviceRequest } from "../types/Device";
import {
  filterDevicesAPI,
  getDeviceListAPI,
  searchDevicesAPI,
} from "../services/DeviceService";
import { IDisplayStatus, IError, IPagination } from "../types";
import { ISelectDeviceType } from "../types/DeviceType";
import { useDeviceContext } from "./DeviceProvider";

interface DeviceFunctionsProps {
  fetchDeviceList: (page: number, size: number) => void;
  fetchSearchedDeviceList: (search: string, page: number, size: number) => void;
  fetchFilteredDevicesList: (page: number, size: number) => void;
}

const DeviceFunctionsContext = createContext<DeviceFunctionsProps | undefined>(
  undefined
);

const DeviceFunctionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    devicesList,
    setDevicesList,
    pagination,
    setPagination,
    searchTerm,
    setTableLoading,
    deviceFilter,
    setDisplayStatus,
    displayStatus,
    handleOpenFilterForm,
  } = useDeviceContext();

  // Reset Pagination provider state
  const {resetPagination} = useDeviceContext();

  /**
   * Function to fetch Devices List
   * @param page
   * @param size
   */
  const fetchDeviceList = (page: number, size: number) => {
    setDevicesList([]);
    setTableLoading(true);
    getDeviceListAPI(page, size)
      .then((res: IResponse) => {
        // Set devices list
        setDevicesList(res.content);
        // Set pagination
        setPagination({
          currentPage: res.metadata?.currentPage || 1,
          totalPages: res.metadata?.totalPages || 1,
          size: res.metadata?.size || 5,
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  /**
   * Fetch the searched Device list
   * This function is used to fetch the Device list based on the search value, from the service and update the state
   * of the Device list, the pagination and the loading state
   * @param search The value to search for
   * @param page The page number
   * @param size The size of the page
   * @returns void
   */
  const fetchSearchedDeviceList = (
    search: string,
    page: number,
    size: number
  ) => {
    searchDevicesAPI(search, page, size)
      .then((data) => {
        setDevicesList(data.content);
        setPagination({
          currentPage: data.metadata?.currentPage ?? 1,
          totalPages: data.metadata?.totalPages ?? 1,
          size: data.metadata?.size ?? 5,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  // Fetch Filtered Devices List
  const fetchFilteredDevicesList = (page: number, size: number) => {
    filterDevicesAPI(deviceFilter, page, size)
      .then((data) => {
        console.log(data);
        setDevicesList(data.content);
        setPagination({
          currentPage: data.metadata?.currentPage || 1,
          totalPages: data.metadata?.totalPages || 1,
          size: data.metadata?.size || 5,
        });
      })
      .catch((data: BasicResponse) => {
        console.log(data);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  // UseEffect to fetch data on function of display status
  // UseEffect to fetch data based on display status
  useEffect(() => {
    if (displayStatus.filter) {
      fetchFilteredDevicesList(pagination.currentPage, pagination.size);
    } else if (displayStatus.search && searchTerm) {
      fetchSearchedDeviceList(
        searchTerm,
        pagination.currentPage,
        pagination.size
      );
    } else {
      fetchDeviceList(pagination.currentPage, pagination.size);
    }
  }, [
    displayStatus.filter,
    displayStatus.search,
    pagination.currentPage,
    pagination.size,
    searchTerm,
    deviceFilter,
  ]);
  return (
    <DeviceFunctionsContext.Provider
      value={{
        fetchDeviceList,
        fetchSearchedDeviceList,
        fetchFilteredDevicesList,
      }}
    >
      {children}
    </DeviceFunctionsContext.Provider>
  );
};

export const useDeviceFunctionsContext = () => {
  const context = useContext(DeviceFunctionsContext);
  if (!context) {
    throw new Error(
      "useDeviceFunctionsContextmust be used within a DeviceFunctionsProvider"
    );
  }
  return context;
};

export { DeviceFunctionsProvider };
