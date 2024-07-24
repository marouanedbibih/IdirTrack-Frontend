import { TableData } from "./TableData";

export interface TableActions {
    onEdit?: (row: TableData) => void;
    onDelete?: (row: TableData) => void;
    onView?: (row: TableData) => void;
}