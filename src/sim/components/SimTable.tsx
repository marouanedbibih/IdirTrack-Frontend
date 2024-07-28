"use client";

import {
  Card,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useSimContext } from "../SimProvider";
import SimTableBody from "./table/SimTableBody";
import SimTableHeader from "./table/SimTableHeader";
import SimTableFooter from "./table/SimTableFooter";

const tableHead = ["SIM Infos", "Operator", "Created At", "Status", "Actions"];

export function SimTable() {
  const { fetchSimList, simList, pagination, setCurrentPage } = useSimContext();

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
          onSearch={(event) => console.log(event.target.value)}
          onDownload={() => console.log("Download")}
        />
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
