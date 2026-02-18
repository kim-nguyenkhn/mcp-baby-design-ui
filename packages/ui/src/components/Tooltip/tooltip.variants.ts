import { cva } from "class-variance-authority";

export const tooltipVariants = cva(
  [
    "absolute z-50 px-3 py-1.5 text-sm rounded-md shadow-lg",
    "bg-neutral-800 text-white",
    "pointer-events-none whitespace-nowrap",
    "animate-in fade-in-0 zoom-in-95",
  ],
  {
    variants: {
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      position: "top",
    },
  },
);

export const tooltipArrowVariants = cva(
  "absolute w-2 h-2 bg-neutral-800 rotate-45",
  {
    variants: {
      position: {
        top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
        bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
        left: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
        right: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2",
      },
    },
    defaultVariants: {
      position: "top",
    },
  },
);
