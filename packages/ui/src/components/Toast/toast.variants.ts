import { cva } from "class-variance-authority";

export const toastVariants = cva(
  [
    "relative flex items-start gap-3 w-80 p-4 rounded-lg shadow-lg border border-neutral-200",
    "bg-white text-neutral-800",
    "animate-in slide-in-from-right-full fade-in-0 duration-300",
  ],
  {
    variants: {
      variant: {
        info: "border-l-4 border-l-info-500",
        success: "border-l-4 border-l-success-500",
        warning: "border-l-4 border-l-warning-500",
        error: "border-l-4 border-l-error-500",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

export const toastIconVariants = cva("shrink-0 mt-0.5", {
  variants: {
    variant: {
      info: "text-info-500",
      success: "text-success-500",
      warning: "text-warning-500",
      error: "text-error-500",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const toastContainerVariants = cva(
  "fixed z-[9999] flex flex-col gap-2 pointer-events-none",
  {
    variants: {
      position: {
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
      },
    },
    defaultVariants: {
      position: "bottom-right",
    },
  },
);
