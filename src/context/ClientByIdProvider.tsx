// Filename: MyContextProvider.tsx

// Chnage the word "My" by your context name
"use client";

import { ClientDetails } from "@/types/Client";
import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

// Define the type for the context state
interface ClientByIdContextProps {
    // The client details state
    clientDetails: ClientDetails | null;
    setClientDetails: (clientDetails: ClientDetails) => void;

    // Client ID
    clientId: number;
    setClientId: (clientId: number) => void;

}

// Create the context
const ClientByIdContext = createContext<ClientByIdContextProps | undefined>(undefined);

// Define the provider component
const ClientByIdProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    // Client details state
    const [clientDetails, setClientDetails] = useState<ClientDetails | null>(null);

    // Client ID state
    const [clientId, setClientId] = useState<number>(1);

  return (
    <ClientByIdContext.Provider value={{ 
        clientDetails,
        setClientDetails,

        clientId,
        setClientId
     }}>
      {children}
    </ClientByIdContext.Provider>
  );
};

// Custom hook to use the context
export const useClientByIdContext = () => {
  const context = useContext(ClientByIdContext);
  if (!context) {
    throw new Error("useClientByIdContext must be used within a ClientByIdProvider");
  }
  return context;
};

export { ClientByIdProvider };
