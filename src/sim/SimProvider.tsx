"use client";

import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import {
  BasicResponse,
  MessageInterface,
  MessageType,
  Pagination,
} from "@/types/Basics";
import { DynamicAlert } from "@/components/alert/DynamicAlert";
import {
  createSimApi,
  deleteSimApi,
  fetchOperatorsApi,
  getSimByIdApi,
  getSimListApi,
  updateSimApi,
} from "./SimServices";
import { Operator, Sim } from "./SimDTOs";

interface SimContextProps {
  // Message
  message: MessageInterface;
  resetMessage: () => void;
  setMessage: (message: MessageInterface) => void;

  // Pagination
  pagination: Pagination;
  setCurrentPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;

  // Create sim form modal state
  isCreateSimModalOpen: boolean;
  setIsCreateSimModalOpen: (isOpen: boolean) => void;

  // Alert
  alertOpen: boolean;
  setAlertOpen: (isOpen: boolean) => void;

  // Fetch SIM List
  fetchSimList: (page: number, size: number) => void;
  simList: Sim[];

  // Delete SIM
  deleteSim: (simId: number | null) => void;

  // Create SIM
  createSim: (sim: Sim) => void;
  sim: Sim;
  setSim: (sim: Sim) => void;

  // Fetch Operator List
  operators: Operator[];
  setOperators: (operators: Operator[]) => void;
  fetchOperators: (page: number, size: number) => void;

  // SimId State
  simId: number | null;
  setSimId: (simId: number | null) => void;

  // Fetch SIM by ID
  fetchSimById: (simId: number | null) => void;

  // Update SIM
  updateSim: (simId: number | null, sim: Sim) => void;
}

const SimContext = createContext<SimContextProps | undefined>(undefined);

const SimProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Messages State
  const [message, setMessage] = useState<MessageInterface>({
    message: "",
    messageType: MessageType.INIT,
    messagesObject: null,
  });

  // Reset Message
  const resetMessage = () => {
    setMessage({
      message: "",
      messageType: MessageType.INIT,
      messagesObject: null,
    });
  };

  // Alert State
  const [alertOpen, setAlertOpen] = useState(false);

  // Create device form modal state
  const [isCreateSimModalOpen, setIsCreateSimModalOpen] = useState(false);

  // Pagination
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
  });

  const setCurrentPage = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const setTotalPages = (totalPages: number) => {
    setPagination((prev) => ({ ...prev, totalPages }));
  };

  // Devices List State
  const [simList, setSimList] = useState<Sim[]>([]);

  /**
   * Fetch SIM List
   * @param page
   * @param size
   * @returns void
   */
  const fetchSimList = (page: number, size: number) => {
    getSimListApi(page, size)
      .then((data: BasicResponse) => {
        setSimList(data.content);
        setTotalPages(data.metadata?.totalPages || 1);
        setCurrentPage(data.metadata?.currentPage || 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * Delete SIM
   * @param simId SIM ID
   * @returns void
   */
  const deleteSim = (simId: number | null) => {
    deleteSimApi(simId)
      .then((data: BasicResponse) => {
        // Set message state
        setMessage({
          message: data.message,
          messageType:
            MessageType[data.messageType as keyof typeof MessageType], // Convert string to enum
          messagesObject: data.messagesObject,
        });

        // Open alert
        setAlertOpen(true);

        // Fetch SIM list
        fetchSimList(pagination.currentPage, 5);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // SIM State
  const [sim, setSim] = useState<Sim>({
    id: null,
    pin: "",
    puk: "",
    ccid: "",
    phone: "",
    operatorId: 0,
  });

  /**
   * Create SIM function
   * @param sim SIM DTO
   * @returns void
   */
  const createSim = (sim: Sim) => {
    // Create SIM API
    createSimApi(sim)
      .then((data: BasicResponse) => {
        // Set message state
        setMessage({
          message: data.message,
          messageType:
            MessageType[data.messageType as keyof typeof MessageType], // Convert string to enum
          messagesObject: data.messagesObject,
        });

        // Open alert
        setAlertOpen(true);

        // Fetch SIM list
        fetchSimList(pagination.currentPage, 5);

        // Close Create SIM modal
        setIsCreateSimModalOpen(false);
      })
      .catch((error) => {
        console.error(error);

        // Set message state
        setMessage({
          message: error.message,
          messageType: MessageType.ERROR,
          messagesObject: error.messagesObject,
        });

        // Open alert
        setAlertOpen(true);
      });
  };

  // Operator State
  const [operators, setOperators] = useState<Operator[]>([]);
  const fetchOperators = (page: number, size: number) => {
    fetchOperatorsApi()
      .then((data: BasicResponse) => {
        setOperators(data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Sim ID State
  const [simId, setSimId] = useState<number | null>(null);

  /**
   * Fetch Sim by id function
   * @param simId SIM ID
   * @returns void
   */
  const fetchSimById = (simId: number | null) => {
    // Fetch SIM by ID
    getSimByIdApi(simId)
      .then((data: BasicResponse) => {
        setSim(data.content);
      })
      .catch((error) => {
        console.error(error);

        // Set message state
        setMessage({
          message: error.message,
          messageType: MessageType.ERROR,
          messagesObject: error.messagesObject,
        });

        // Open alert
        setAlertOpen(true);
      });
  };

  /**
   * Update SIM function
   * @param simId SIM ID
   * @param sim SIM DTO
   * @returns void
   */
  const updateSim = (simId: number | null, sim: Sim) => {
    // Create SIM API
    updateSimApi(simId, sim)
      .then((data: BasicResponse) => {
        // Set message state
        setMessage({
          message: data.message,
          messageType:
            MessageType[data.messageType as keyof typeof MessageType], // Convert string to enum
          messagesObject: data.messagesObject,
        });

        // Open alert
        setAlertOpen(true);

        // Fetch SIM list
        fetchSimList(pagination.currentPage, 5);

        // Close Create SIM modal
        setIsCreateSimModalOpen(false);

        // Reset SIM ID
        setSimId(null);
      })
      .catch((error) => {
        console.error(error);

        // Set message state
        setMessage({
          message: error.message,
          messageType: MessageType.ERROR,
          messagesObject: error.messagesObject,
        });

        // Open alert
        setAlertOpen(true);
      });
  };

  return (
    <SimContext.Provider
      value={{
        // Message
        message,
        resetMessage,
        setMessage,

        // Pagination
        pagination,
        setCurrentPage,
        setTotalPages,

        // Create sim form modal state
        isCreateSimModalOpen,
        setIsCreateSimModalOpen,

        // Alert
        alertOpen,
        setAlertOpen,

        // Fetch SIM List
        fetchSimList,
        simList,

        // Delete SIM
        deleteSim,

        // Create SIM
        createSim,
        sim,
        setSim,

        // Fetch Operator List
        operators,
        setOperators,
        fetchOperators,

        // SimId State
        simId,
        setSimId,

        // Fetch SIM by ID
        fetchSimById,

        // Update SIM
        updateSim,
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
    </SimContext.Provider>
  );
};

export const useSimContext = () => {
  const context = useContext(SimContext);
  if (!context) {
    throw new Error("useSimContext must be used within a SimProvider");
  }
  return context;
};

export { SimProvider };
