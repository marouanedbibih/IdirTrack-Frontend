import React from "react";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
    const carouselPages = 5;

    const onChangePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const onPreviousPage = () => {
        if (currentPage > 1) {
            onChangePage(currentPage - 1);
        }
    };

    const onNextPage = () => {
        if (currentPage < totalPages) {
            onChangePage(currentPage + 1);
        }
    };

    // Calculate the start and end pages for the carousel
    let startPage = currentPage - Math.floor(carouselPages / 2);
    let endPage = startPage + carouselPages - 1;

    // Ensure pages stay within bounds
    if (startPage < 1) {
        startPage = 1;
        endPage = startPage + carouselPages - 1;
    }
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - carouselPages + 1;
        if (startPage < 1) {
            startPage = 1;
        }
    }

    return (
        <div className="w-64 h-10 flex justify-center items-center space-x-4">
            <button
                className={`w-[90px] h-10 px-4 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px] ${
                    currentPage === 1 ? "bg-gray-800" : "bg-emerald-600"
                }`}
                onClick={onPreviousPage}
                disabled={currentPage === 1}
            >
                <TbPlayerTrackPrevFilled />
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
                const pageNumber = startPage + index;
                return (
                    <button
                        key={pageNumber}
                        className={`w-[39px] h-10 px-4 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px] ${
                            currentPage === pageNumber ? "bg-emerald-600" : "bg-gray-800"
                        }`}
                        onClick={() => onChangePage(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button
                className={`w-[90px] h-10 px-4 py-2.5 rounded-lg justify-center items-center gap-2 inline-flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px] ${
                    currentPage === totalPages ? "bg-gray-800" : "bg-emerald-600"
                }`}
                onClick={onNextPage}
                disabled={currentPage === totalPages}
            >
                <TbPlayerTrackNextFilled />
            </button>
        </div>
    );
};

export default Pagination;
