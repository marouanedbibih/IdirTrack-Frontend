"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

// Define the type for the context state
interface ClientContextProps {

}

// Create the context
const ClientContext = createContext<ClientContextProps | undefined>(undefined);

// Define the provider component
const ClientProvider: React.FC<{ children: ReactNode }> = ({ children }) => {


  return (
    <ClientContext.Provider
      value={{

      }}
    >
      {children}

    </ClientContext.Provider>
  );
};

// Custom hook to use the context
export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};

export { ClientProvider };
