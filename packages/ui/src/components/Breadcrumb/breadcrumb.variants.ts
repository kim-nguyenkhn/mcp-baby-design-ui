import { cva } from "class-variance-authority";

export const breadcrumbVariants = cva(
  "flex items-center text-sm",
  {
    variants: {},
    defaultVariants: {},
  },
);

export const breadcrumbItemVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      isCurrent: {
        true: "text-neutral-800 font-medium",
        false: "text-primary-600 hover:text-primary-700 hover:underline",
      },
    },
    defaultVariants: {
      isCurrent: false,
    },
  },
);

export const breadcrumbSeparatorVariants = cva(
  "mx-2 text-neutral-400 select-none",
  {
    variants: {},
    defaultVariants: {},
  },
);
