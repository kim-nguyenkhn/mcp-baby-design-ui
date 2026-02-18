import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  [
    "inline-flex items-center justify-center overflow-hidden",
    "bg-neutral-200 text-neutral-700 font-medium select-none shrink-0",
  ],
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
        xl: "w-16 h-16 text-xl",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  },
);
