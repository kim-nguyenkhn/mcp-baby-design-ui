import { cva } from "class-variance-authority";

export const modalOverlayVariants = cva(
  [
    "fixed inset-0 z-50 flex items-center justify-center",
    "bg-black/50 backdrop-blur-sm",
    "animate-in fade-in-0 duration-200",
  ],
);

export const modalContentVariants = cva(
  [
    "relative flex flex-col bg-white rounded-xl shadow-xl",
    "max-h-[90vh] overflow-hidden",
    "animate-in fade-in-0 zoom-in-95 duration-200",
  ],
  {
    variants: {
      size: {
        sm: "w-full max-w-sm",
        md: "w-full max-w-md",
        lg: "w-full max-w-lg",
        xl: "w-full max-w-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const modalHeaderVariants = cva(
  "flex items-center justify-between px-6 py-4 border-b border-neutral-200",
);

export const modalBodyVariants = cva(
  "flex-1 overflow-y-auto px-6 py-4 text-neutral-700",
);

export const modalFooterVariants = cva(
  "flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200",
);
