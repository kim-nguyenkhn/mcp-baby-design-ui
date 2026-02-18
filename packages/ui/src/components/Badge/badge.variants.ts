import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center font-medium rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        filled: "",
        outline: "border bg-transparent",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: {
        sm: "px-2 py-0.5 text-xs gap-1",
        md: "px-2.5 py-0.5 text-sm gap-1.5",
      },
    },
    compoundVariants: [
      // Filled variants
      { variant: "filled", color: "primary", className: "bg-primary-100 text-primary-700" },
      { variant: "filled", color: "secondary", className: "bg-secondary-100 text-secondary-700" },
      { variant: "filled", color: "success", className: "bg-success-100 text-success-700" },
      { variant: "filled", color: "warning", className: "bg-warning-100 text-warning-700" },
      { variant: "filled", color: "error", className: "bg-error-100 text-error-700" },
      { variant: "filled", color: "neutral", className: "bg-neutral-100 text-neutral-700" },
      // Outline variants
      { variant: "outline", color: "primary", className: "border-primary-300 text-primary-700" },
      { variant: "outline", color: "secondary", className: "border-secondary-300 text-secondary-700" },
      { variant: "outline", color: "success", className: "border-success-300 text-success-700" },
      { variant: "outline", color: "warning", className: "border-warning-300 text-warning-700" },
      { variant: "outline", color: "error", className: "border-error-300 text-error-700" },
      { variant: "outline", color: "neutral", className: "border-neutral-300 text-neutral-700" },
    ],
    defaultVariants: {
      variant: "filled",
      color: "primary",
      size: "md",
    },
  },
);

export const badgeDotVariants = cva("rounded-full shrink-0", {
  variants: {
    color: {
      primary: "bg-primary-500",
      secondary: "bg-secondary-500",
      success: "bg-success-500",
      warning: "bg-warning-500",
      error: "bg-error-500",
      neutral: "bg-neutral-500",
    },
    size: {
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});
