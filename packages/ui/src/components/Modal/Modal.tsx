import React, {
  useEffect,
  useRef,
  useCallback,
  useId,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { X } from "../Icons";
import {
  modalOverlayVariants,
  modalContentVariants,
  modalHeaderVariants,
  modalBodyVariants,
  modalFooterVariants,
} from "./modal.variants";

// ─── Modal ───

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Called when the modal should close */
  onClose: () => void;
  /** Size of the modal */
  size?: "sm" | "md" | "lg" | "xl";
  /** Content of the modal */
  children: React.ReactNode;
  /** Additional class names for the modal container */
  className?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, size = "md", children, className }, ref) => {
    const titleId = useId();
    const contentRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    // Focus trap
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
          return;
        }

        if (e.key === "Tab" && contentRef.current) {
          const focusableElements = contentRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      },
      [onClose],
    );

    // Scroll lock and event listeners
    useEffect(() => {
      if (open) {
        previousFocusRef.current = document.activeElement as HTMLElement;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        // Focus the first focusable element inside the modal
        requestAnimationFrame(() => {
          if (contentRef.current) {
            const firstFocusable = contentRef.current.querySelector<HTMLElement>(
              'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );
            if (firstFocusable) {
              firstFocusable.focus();
            } else {
              contentRef.current.focus();
            }
          }
        });
      }

      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);

        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }, [open, handleKeyDown]);

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      },
      [onClose],
    );

    if (!open || typeof document === "undefined") return null;

    return createPortal(
      <div
        className={cn(modalOverlayVariants())}
        onClick={handleBackdropClick}
      >
        <div
          ref={(node) => {
            (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={cn(modalContentVariants({ size }), className)}
        >
          <ModalContext.Provider value={{ titleId, onClose }}>
            {children}
          </ModalContext.Provider>
        </div>
      </div>,
      document.body,
    );
  },
);

Modal.displayName = "Modal";

// ─── Internal Context ───

interface ModalContextValue {
  titleId: string;
  onClose: () => void;
}

const ModalContext = React.createContext<ModalContextValue>({
  titleId: "",
  onClose: () => {},
});

function useModalContext() {
  return React.useContext(ModalContext);
}

// ─── ModalHeader ───

export interface ModalHeaderProps {
  /** Header content (typically a title) */
  children: React.ReactNode;
  /** Show close button */
  showCloseButton?: boolean;
  /** Additional class names */
  className?: string;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, showCloseButton = true, className }, ref) => {
    const { titleId, onClose } = useModalContext();

    return (
      <div ref={ref} className={cn(modalHeaderVariants(), className)}>
        <h2
          id={titleId}
          className="text-lg font-semibold text-neutral-800"
        >
          {children}
        </h2>
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        )}
      </div>
    );
  },
);

ModalHeader.displayName = "ModalHeader";

// ─── ModalBody ───

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn(modalBodyVariants(), className)}>
        {children}
      </div>
    );
  },
);

ModalBody.displayName = "ModalBody";

// ─── ModalFooter ───

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={cn(modalFooterVariants(), className)}>
        {children}
      </div>
    );
  },
);

ModalFooter.displayName = "ModalFooter";
