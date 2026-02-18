import { cva } from "class-variance-authority";

export const tagVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-colors",
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
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
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
      disabled: false,
    },
  },
);

export const tagRemoveButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-full shrink-0",
    "p-0.5 -mr-0.5",
    "hover:bg-black/10 transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current",
  ],
  {
    variants: {
      disabled: {
        true: "pointer-events-none",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);
