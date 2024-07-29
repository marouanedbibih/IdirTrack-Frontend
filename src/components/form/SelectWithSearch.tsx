import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

export interface SelectableItem {
  [key: string]: any;
}

interface SelectWithSearchProps<T extends SelectableItem> {
  label: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  fetchItems: (page: number, size: number) => void;
  fetchSearchedItems: (term: string, page: number, size: number) => void;
  items: T[];
  currentPage: number;
  totalPage: number;
  setCurrentPage: (page: number) => void;
  setTotalPage: (page: number) => void;
  selectedValue: number;
  setSelectedValue: (value: number) => void;
  setSelectedItem: (item: T) => void;
  keys: string[];
  error?: string | null;
}

function SelectWithSearch<T extends SelectableItem>({
  label,
  searchTerm,
  setSearchTerm,
  fetchItems,
  fetchSearchedItems,
  items,
  currentPage,
  totalPage,
  setCurrentPage,
  setTotalPage,
  selectedValue,
  setSelectedValue,
  setSelectedItem,
  keys,
  error,
}: SelectWithSearchProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm !== "") {
      fetchSearchedItems(searchTerm, currentPage, 10);
    } else {
      fetchItems(currentPage, 10);
    }
  }, [searchTerm]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: T) => {
    const id = item.id; // Assumes each item has an 'id' property
    setSelectedValue(id);
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="mb-1 flex flex-col gap-4">
      <Typography
        variant="h6"
        color="blue-gray"
        className="-mb-3"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {label}
      </Typography>
      <div className="w-full relative ">
        <button
          onClick={toggleDropdown}
          className={`w-full h-full bg-transparent font-sans font-normal text-left outline-none transition-all border-2 text-sm px-3 py-3 rounded-[7px] ${
            error
              ? "border-red-500 text-red-500"
              : "border-gray-900 text-blue-gray-700"
          }`}
        >
          {selectedValue === 0
            ? `Select a ${label}`
            : items.find((option) => option.id === selectedValue)?.[keys[0]]}
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                // console.log(e.target.value);
                setSearchTerm(e.target.value);
                console.log(searchTerm);
              }}
              placeholder="Search..."
              className={`w-full px-3 py-2 border-b ${
                error
                  ? "border-red-500 placeholder-red-500"
                  : "border-gray-300 placeholder-gray-500"
              }`}
            />
            <ul className="max-h-60 overflow-y-auto">
              {items.map((option) => (
                <li
                  key={option.id}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {keys.length > 0 && (
                    <>
                      <p className="text-base font-semibold">
                        {option[keys[0]]}
                      </p>
                      {keys.slice(1).map((key) => (
                        <small
                          key={key}
                          className="block text-sm text-gray-500"
                        >
                          {option[key]}
                        </small>
                      ))}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && (
        <Typography
          variant="small"
          color="red"
          className="mt-1"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {error}
        </Typography>
      )}
    </div>
  );
}

export default SelectWithSearch;
