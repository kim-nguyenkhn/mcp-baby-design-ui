import React from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "../Icons";
import { paginationVariants, paginationItemVariants } from "./pagination.variants";

function generatePages(
  totalPages: number,
  currentPage: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, "ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );
    return [1, "ellipsis", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i,
  );
  return [1, "ellipsis", ...middleRange, "ellipsis", totalPages];
}

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  /** Total number of pages */
  totalPages: number;
  /** Currently active page (1-based) */
  currentPage: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of sibling pages on each side of current */
  siblingCount?: number;
  /** Show previous/next navigation buttons */
  showPrevNext?: boolean;
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      totalPages,
      currentPage,
      onPageChange,
      siblingCount = 1,
      showPrevNext = true,
      ...props
    },
    ref,
  ) => {
    const pages = generatePages(totalPages, currentPage, siblingCount);

    return (
      <nav ref={ref} aria-label="Pagination" className={cn(className)} {...props}>
        <ul className={paginationVariants()}>
          {showPrevNext && (
            <li>
              <button
                type="button"
                className={cn(paginationItemVariants({ active: false }))}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Go to previous page"
              >
                <ChevronLeft size={16} />
              </button>
            </li>
          )}

          {pages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <li key={`ellipsis-${index}`}>
                  <span
                    className="inline-flex items-center justify-center min-w-[36px] h-9 px-2 text-neutral-500"
                    data-testid="pagination-ellipsis"
                  >
                    ...
                  </span>
                </li>
              );
            }

            const isActive = page === currentPage;
            return (
              <li key={page}>
                <button
                  type="button"
                  className={cn(paginationItemVariants({ active: isActive }))}
                  onClick={() => onPageChange(page)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </button>
              </li>
            );
          })}

          {showPrevNext && (
            <li>
              <button
                type="button"
                className={cn(paginationItemVariants({ active: false }))}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Go to next page"
              >
                <ChevronRight size={16} />
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
