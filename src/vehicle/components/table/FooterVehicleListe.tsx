import React from "react";
import { CardFooter, Button, IconButton, Card } from "@material-tailwind/react";
import { useVehicleContext } from "@/vehicle/contexts/VehicleProvider";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Add Chevron icons for navigation

export function FooterVehicleListe() {
  const { vehiclePagination, setCurrentPage } = useVehicleContext();

  const handlePreviousPage = () => {
    if (vehiclePagination.currentPage > 1) {
      setCurrentPage(vehiclePagination.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (vehiclePagination.currentPage < vehiclePagination.totalPages) {
      setCurrentPage(vehiclePagination.currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const pages = [];
    for (let i = 1; i <= vehiclePagination.totalPages; i++) {
      pages.push(
        <IconButton
          key={i}
          variant={vehiclePagination.currentPage === i ? "outlined" : "text"}
          size="sm"
          className={`${vehiclePagination.currentPage === i ? "bg-science-blue-700 text-white" : "text-black"} mx-1`}
          onClick={() => handlePageClick(i)}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          {i}
        </IconButton>
      );
    }
    return pages;
  };

  return (
    <Card className="h-full w-1/2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <Button
          variant="text"
          size="sm"
          className="text-black"
          disabled={vehiclePagination.currentPage === 1}
          onClick={handlePreviousPage}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          PREVIOUS
        </Button>
        <div className="flex items-center">
          {renderPageButtons()}
        </div>
        <Button
          variant="text"
          size="sm"
          className="text-black"
          disabled={vehiclePagination.currentPage === vehiclePagination.totalPages}
          onClick={handleNextPage}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          NEXT
          <ChevronRightIcon className="w-5 h-5 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FooterVehicleListe;
