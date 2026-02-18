import { cva } from "class-variance-authority";

export const tableVariants = cva(
  "w-full caption-bottom text-sm border-collapse",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const tableHeaderVariants = cva(
  "[&_tr]:border-b border-neutral-200",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const tableBodyVariants = cva(
  "[&_tr:last-child]:border-0",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const tableRowVariants = cva(
  "border-b border-neutral-200 transition-colors hover:bg-neutral-50",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const tableCellVariants = cva(
  "p-3 align-middle text-neutral-800",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const tableHeaderCellVariants = cva(
  [
    "p-3 align-middle text-left font-semibold text-neutral-700 bg-neutral-50",
    "[&[aria-sort]]:cursor-pointer [&[aria-sort]]:select-none",
  ],
  {
    variants: {
      sortable: {
        true: "cursor-pointer select-none hover:bg-neutral-100",
        false: "",
      },
    },
    defaultVariants: {
      sortable: false,
    },
  },
);
