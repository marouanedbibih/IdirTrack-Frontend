/* eslint-disable react-hooks/exhaustive-deps */
// Filename: MyContextProvider.tsx

"use client";
import React, { createContext, useState, ReactNode, useContext } from "react";
import { useSimContext } from "./SimProvider";
import { getSimListApi, searchSimAPI } from "../SimServices";
import { IMyErrorResponse, IMyResponse } from "@/operators/types";
import { useGlobalContext } from "@/context/GlobalProvider";

// Define the type for the context state
interface SimFunctionsContextProps {
  // Fetch Sim List
  fetchSimList: (page: number, size: number) => void;
  // ReFetch Sim List
  reFetchSimList: () => void;
}

// Create the context
const SimFunctionsContext = createContext<SimFunctionsContextProps | undefined>(
  undefined
);

// Define the provider component
const SimFunctionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Import the Sim List form the SimProvider
  const { setSimList } = useSimContext();
  // Import the Pagination form the SimProvider
  const { pagination, setPagination } = useSimContext();
  // Import the Table Loading form the SimProvider
  const { setTableLoading } = useSimContext();
  // Import the Display Status form the SimProvider
  const { displayStatus, setDisplayStatus } = useSimContext();
  // Import the Sim ID form the SimProvider
  const { simId, setSimId } = useSimContext();
  // Import the Open Dialog form the SimProvider
  const { setOpenDialog } = useSimContext();
  // Import the Loading Delete form the SimProvider
  const { setLoadingDelete } = useSimContext();
  // Import the message form the GlobalProvider
  const { setMessage } = useGlobalContext();
  // Import the alertOpen form the GlobalProvider
  const { setAlertOpen } = useGlobalContext();
  // Import the searchTerm form the SimProvider
  const { searchTerm } = useSimContext();

  // Hanle reFetch function
  const reFetchSimList = () => {
    setPagination({ ...pagination, currentPage: 1 });
    fetchSimList(pagination.currentPage, pagination.size);
  };

  // Function to fetch the Sim List
  const fetchSimList = (page: number, size: number) => {
    setDisplayStatus({
      normal: true,
      filter: false,
      search: false,
    });
    setTableLoading(true);
    getSimListApi(page, size)
      .then((res: IMyResponse) => {
        setSimList(res.data);
        setPagination({
          currentPage: res.metadata.currentPage,
          totalPages: res.metadata.totalPages,
          size: res.metadata.size,
        });
      })
      .catch((err: IMyErrorResponse) => {
        console.error("Error fetching SIM list", err);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  /**
   * Search SIM
   */

  const searchSim = (term: string, page: number, size: number) => {
    searchSimAPI(term, page, size)
      .then((res: IMyResponse) => {
        setSimList(res.data);
        setPagination({
          currentPage: res.metadata.currentPage,
          totalPages: res.metadata.totalPages,
          size: res.metadata.size,
        });
      })
      .catch((err: IMyErrorResponse) => {
        console.error("Error fetching SIM list", err);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  // UseEffect to fetch Sim Data in table
  React.useEffect(() => {
    if (displayStatus.search && searchTerm) {
      searchSim(searchTerm, pagination.currentPage, pagination.size);
    } else {
      fetchSimList(pagination.currentPage, pagination.size);
    }
  }, [
    pagination.currentPage,
    pagination.size,
    displayStatus.normal,
    displayStatus.search,
    searchTerm,
  ]);

  return (
    <SimFunctionsContext.Provider
      value={{
        fetchSimList,
        reFetchSimList,
      }}
    >
      {children}
    </SimFunctionsContext.Provider>
  );
};

// Custom hook to use the context
export const useSimFunctionsContext = () => {
  const context = useContext(SimFunctionsContext);
  if (!context) {
    throw new Error(
      "useSimFunctionsContext must be used within a SimFunctionsProvider"
    );
  }
  return context;
};

export { SimFunctionsProvider };
