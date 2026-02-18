import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-medium transition-colors",
    "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        filled:
          "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
        outline:
          "border border-primary-500 text-primary-500 bg-transparent hover:bg-primary-50 active:bg-primary-100",
        ghost:
          "text-primary-500 bg-transparent hover:bg-primary-50 active:bg-primary-100",
        destructive:
          "bg-error-500 text-white hover:bg-error-600 active:bg-error-700",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  },
);
