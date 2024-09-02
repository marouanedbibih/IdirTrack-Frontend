"use client";

import { IDialog, IFetching, IID, ILoading, IPagination } from "@/types";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { SubscriptionTableDTO } from "../subscription";

// Define the type for the context state
interface SubscriptionContextProps {
  // Basics States
  loading: ILoading;
  setLoading: (loading: ILoading) => void;
  dialog: IDialog;
  setDialog: (dialog: IDialog) => void;
  fetching: IFetching;
  setFetching: (fetching: IFetching) => void;
  pagination: IPagination;
  setPagination: (pagination: IPagination) => void;
  ID: IID;
  setID: (ID: IID) => void;

  // State functions
  initPagination: () => void;

  // Subscriptions States
  subscriptionsList: SubscriptionTableDTO[] | null;
  setSubscriptionsList: (
    subscriptionsList: SubscriptionTableDTO[] | null
  ) => void;
  // Search Keyword
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
}

// Create the context
const SubscriptionContext = createContext<SubscriptionContextProps | undefined>(
  undefined
);

// Define the provider component
const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Basics States
  const [loading, setLoading] = useState<ILoading>({
    delete: false,
    form: false,
    table: false,
  });
  const [dialog, setDialog] = useState<IDialog>({
    delete: false,
    form: false,
    filter: false,
  });
  const [fetching, setFetching] = useState<IFetching>({
    normal: true,
    filter: false,
    search: false,
  });
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 0,
    size: 5,
  });
  const [ID, setID] = useState<IID>({
    delete: null,
    update: null,
    fetch: null,
  });

  // State functions
  const initPagination = () => {
    setPagination({
      currentPage: 1,
      totalPages: 0,
      size: 5,
      totalElements: 0,
    });
  };

  // Subscriptions States
  const [subscriptionsList, setSubscriptionsList] = useState<
    SubscriptionTableDTO[] | null
  >(null);
  // Search Keyword
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <SubscriptionContext.Provider
      value={{
        // Basics States
        loading,
        setLoading,
        dialog,
        setDialog,
        fetching,
        setFetching,
        pagination,
        setPagination,
        ID,
        setID,
        // State functions
        initPagination,
        // Subscriptions States
        subscriptionsList,
        setSubscriptionsList,
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

// Custom hook to use the context
export const useSubscriptionContext = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      "useSubscriptionContext must be used within a SubscriptionProvider"
    );
  }
  return context;
};

export { SubscriptionProvider };
