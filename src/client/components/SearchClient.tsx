import React from "react";
import { Input } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useClientContext } from "../contexts/ClientProvider";
import { useSearchClient } from "../hooks/ClientHooks";

interface SearchClientProps {}

export const SearchClient: React.FC<SearchClientProps> = ({}) => {
  // Search client Hooks
  const {setFetching,initPagination,setSearchKeyword} =  useSearchClient();

  // On search client
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    initPagination();
    if (e.target.value !== "") {
      setFetching({ normal: false, filter: false, search: true });
      setSearchKeyword(e.target.value);
    } else {
      setFetching({ normal: true, filter: false, search: false });
      setSearchKeyword("");
    }
  };
  return (
    <div className="w-full md:w-72">
      <Input
        label="Search"
        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        onChange={onSearch}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
    </div>
  );
};
