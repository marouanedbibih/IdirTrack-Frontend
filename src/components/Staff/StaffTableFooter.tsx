import * as React from "react";
import { Button, CardFooter, IconButton } from "@material-tailwind/react";

export interface IStaffTableFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StaffTableFooter: React.FC<IStaffTableFooterProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const range = 8;
    const halfRange = Math.floor(range / 2);
    let start = Math.max(1, currentPage - halfRange);
    let end = Math.min(totalPages, currentPage + halfRange);

    if (currentPage - halfRange <= 0) {
      end = Math.min(totalPages, end + (halfRange - currentPage + 1));
    }

    if (currentPage + halfRange >= totalPages) {
      start = Math.max(1, start - (currentPage + halfRange - totalPages));
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <div className="w-1/2 flex flex-1 gap-8 justify-center">
        <Button
          variant="outlined"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {getPageNumbers().map((page) => (
            <IconButton
              key={page}
              variant={page === currentPage ? "outlined" : "text"}
              size="sm"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </IconButton>
          ))}
        </div>
        <Button
          variant="outlined"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </CardFooter>
  );
};

export default StaffTableFooter;
