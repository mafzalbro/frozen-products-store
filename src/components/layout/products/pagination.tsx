"use client";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      // Ellipsis for long paginations
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
            //   href="#"
              onClick={() => onPageChange(i)}
              className={currentPage === i ? "bg-blue-900 dark:bg-blue-800 text-white" : ""}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <ShadcnPagination className="flex justify-center space-x-2 mt-8" aria-label="Pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            // href="#"
            onClick={() => onPageChange(currentPage - 1)}
            // disabled={currentPage === 1}
            className={`${currentPage === 1 ? 'hidden': 'visible'}`}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            // href="#"
            onClick={() => onPageChange(currentPage + 1)}
            className={`${currentPage === totalPages ? 'hidden': 'visible'}`}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
