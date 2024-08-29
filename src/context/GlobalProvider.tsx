"use client";

import { DynamicAlert } from "@/components/alert/DynamicAlert";
import { MessageInterface, MessageType } from "@/types/Basics";
import { ReactNode, useContext, useEffect, useState } from "react";
import { createContext } from "react";

// Define the types for your context here
interface ProviderProps {
  // Token state
  token: string | null;
  setTokenInLocalStorage: (token: string) => void;
  getTokenFromLocalStorage: () => string | null;
  // Role state
  role: string | null;
  setRoleInLocalStorage: (role: string) => void;
  getRoleFromLocalStorage: () => string | null;
  // Message state
  message: MessageInterface;
  setMessage: (message: MessageInterface) => void;
  // Alert state
  alertOpen: boolean;
  setAlertOpen: (open: boolean) => void;
}

// Create the context
const GlobalContext = createContext<ProviderProps | undefined>(undefined);

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Function to set the token and save it to localStorage
  const setTokenInLocalStorage = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Function to get the token from localStorage
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  // On component mount, check localStorage for an existing token
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Role state
  const [role, setRole] = useState<string | null>(null);

  // Function to set the role and save it to localStorage
  const setRoleInLocalStorage = (newRole: string) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };

  // Function to get the role from localStorage
  const getRoleFromLocalStorage = () => {
    return localStorage.getItem("role");
  };

  // On component mount, check localStorage for an existing role
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  // Message state
  const [message, setMessage] = useState<MessageInterface>({
    message:"",
    messageType: MessageType.INIT,
  });

  // Alert state
  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        // Token state
        token,
        setTokenInLocalStorage,
        getTokenFromLocalStorage,
        // Role state
        role,
        setRoleInLocalStorage,
        getRoleFromLocalStorage,
        // Message state
        message,
        setMessage,
        // Alert state
        alertOpen,
        setAlertOpen,
      }}
    >
      {children}

      {message.messageType !== MessageType.INIT && (
        <DynamicAlert
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title={message.messageType.toString()}
          message={message.message ?? ""}
          type={message.messageType}
        />
      )}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export { GlobalProvider };
