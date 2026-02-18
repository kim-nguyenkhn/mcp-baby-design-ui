import React from "react";
import { cn } from "../../lib/utils";
import { ChevronUp, ChevronDown } from "../Icons";
import {
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableRowVariants,
  tableCellVariants,
  tableHeaderCellVariants,
} from "./table.variants";

/* ─── Table ─── */

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table ref={ref} className={cn(tableVariants(), className)} {...props}>
        {children}
      </table>
    </div>
  ),
);
Table.displayName = "Table";

/* ─── TableHeader ─── */

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...props }, ref) => (
  <thead ref={ref} className={cn(tableHeaderVariants(), className)} {...props}>
    {children}
  </thead>
));
TableHeader.displayName = "TableHeader";

/* ─── TableBody ─── */

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, children, ...props }, ref) => (
  <tbody ref={ref} className={cn(tableBodyVariants(), className)} {...props}>
    {children}
  </tbody>
));
TableBody.displayName = "TableBody";

/* ─── TableRow ─── */

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => (
    <tr ref={ref} className={cn(tableRowVariants(), className)} {...props}>
      {children}
    </tr>
  ),
);
TableRow.displayName = "TableRow";

/* ─── TableCell ─── */

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => (
    <td ref={ref} className={cn(tableCellVariants(), className)} {...props}>
      {children}
    </td>
  ),
);
TableCell.displayName = "TableCell";

/* ─── TableHeaderCell ─── */

export type SortDirection = "asc" | "desc" | null;

export interface TableHeaderCellProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Current sort direction */
  sortDirection?: SortDirection;
  /** Callback when sort is triggered */
  onSort?: () => void;
}

export const TableHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(
  (
    {
      className,
      children,
      sortable = false,
      sortDirection,
      onSort,
      ...props
    },
    ref,
  ) => {
    const ariaSortValue = sortable
      ? sortDirection === "asc"
        ? "ascending"
        : sortDirection === "desc"
          ? "descending"
          : "none"
      : undefined;

    const handleClick = () => {
      if (sortable && onSort) {
        onSort();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (sortable && onSort && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onSort();
      }
    };

    return (
      <th
        ref={ref}
        className={cn(tableHeaderCellVariants({ sortable }), className)}
        aria-sort={ariaSortValue}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={sortable ? 0 : undefined}
        role={sortable ? "columnheader" : undefined}
        {...props}
      >
        <div className="flex items-center gap-1">
          {children}
          {sortable && (
            <span className="inline-flex flex-col" data-testid="sort-indicator">
              <ChevronUp
                size={12}
                className={cn(
                  "transition-colors",
                  sortDirection === "asc"
                    ? "text-primary-500"
                    : "text-neutral-400",
                )}
              />
              <ChevronDown
                size={12}
                className={cn(
                  "-mt-1 transition-colors",
                  sortDirection === "desc"
                    ? "text-primary-500"
                    : "text-neutral-400",
                )}
              />
            </span>
          )}
        </div>
      </th>
    );
  },
);
TableHeaderCell.displayName = "TableHeaderCell";
