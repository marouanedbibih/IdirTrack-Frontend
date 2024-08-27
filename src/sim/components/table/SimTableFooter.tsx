// @ts-nocheck
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface SimTableFooterProps {
  totalPages: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const SimTableFooter: React.FC<SimTableFooterProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const pagesPerSet = 8;
  const totalSets = Math.ceil(totalPages / pagesPerSet);

  const onChangePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getItemProps = (index: number) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "gray",
    onClick: () => onChangePage(index),
  });

  const next = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const startPage =
    Math.floor((currentPage - 1) / pagesPerSet) * pagesPerSet + 1;
  const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center gap-4 bg-white rounded-lg shadow-lg shadow-black p-4 mb-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={currentPage === 1}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <IconButton

            key={page}
            {...getItemProps(page)}
          >
            {page}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPages}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SimTableFooter;
