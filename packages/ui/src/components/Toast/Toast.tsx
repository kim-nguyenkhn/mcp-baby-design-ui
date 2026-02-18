import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { Info, Check, AlertCircle, X } from "../Icons";
import {
  toastVariants,
  toastIconVariants,
  toastContainerVariants,
} from "./toast.variants";

// ─── Types ───

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastProps {
  /** Visual variant of the toast */
  variant?: ToastVariant;
  /** Title text */
  title: string;
  /** Optional description text */
  description?: string;
  /** Auto-dismiss duration in ms. Set to 0 to disable auto-dismiss. */
  duration?: number;
  /** Called when the toast is dismissed */
  onClose?: () => void;
  /** Additional class names */
  className?: string;
}

export interface ToastOptions {
  variant?: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastEntry extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

// ─── Context ───

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Icon map ───

const variantIcons: Record<ToastVariant, React.ReactElement> = {
  info: <Info size={20} />,
  success: <Check size={20} />,
  warning: <AlertCircle size={20} />,
  error: <AlertCircle size={20} />,
};

// ─── Toast ───

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      variant = "info",
      title,
      description,
      duration = 5000,
      onClose,
      className,
    },
    ref,
  ) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      if (duration > 0 && onClose) {
        timerRef.current = setTimeout(onClose, duration);
      }
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [duration, onClose]);

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(toastVariants({ variant }), "pointer-events-auto", className)}
      >
        <span className={cn(toastIconVariants({ variant }))} aria-hidden="true">
          {variantIcons[variant]}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-800">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-neutral-600">{description}</p>
          )}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-1 rounded-md text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  },
);

Toast.displayName = "Toast";

// ─── ToastProvider ───

export interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const counterRef = useRef(0);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((options: ToastOptions) => {
    const id = `toast-${++counterRef.current}`;
    setToasts((prev) => [...prev, { ...options, id }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            className={cn(toastContainerVariants({ position: "bottom-right" }))}
            aria-label="Notifications"
          >
            {toasts.map((t) => (
              <Toast
                key={t.id}
                variant={t.variant}
                title={t.title}
                description={t.description}
                duration={t.duration}
                onClose={() => removeToast(t.id)}
              />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = "ToastProvider";

// ─── useToast ───

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
