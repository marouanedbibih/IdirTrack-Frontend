"use client";

import {
  Card,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useSimContext } from "../SimProvider";
import SimTableBody from "./table/SimTableBody";
import SimTableHeader from "./table/SimTableHeader";
import SimTableFooter from "./table/SimTableFooter";

const tableHead = ["Phone Num", "Operator","Ccid","Pin" ,"Puk", "Created At", "Status", "Actions"];

export function SimTable() {
  const { fetchSimList, simList, pagination, setCurrentPage,searchTerm,setSearchTerm,fetchSearchedSims } = useSimContext();
  


  useEffect(() => {
    fetchSimList(pagination.currentPage, 5);
  }, [pagination.currentPage]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Card
        className="w-full"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <SimTableHeader
          title="SIMs List"
          subtitle="Here is a list of all sims"
          onSearch={(event) => {
            setSearchTerm(event.target.value);
            fetchSearchedSims(event.target.value, 1, 5);
          }}
          onDownload={() => console.log("Download")}
        />
        {/* <SimTableHeader
          title="SIMs List"+
          subtitle="Here is a list of all sims"
          onSearch={(event) =>  {
            // console.log("Search term: ",event.target.value)
            setSearchTerm(event.target.value);
            fetchSearchedSims(event.target.value,1,5);
          }}
          onDownload={() => console.log("Download")}
        /> */}
        <SimTableBody tableRows={simList} tableHead={tableHead} />
        <SimTableFooter
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          setCurrentPage={setCurrentPage}
        />
      </Card>
    </div>
  );
}
