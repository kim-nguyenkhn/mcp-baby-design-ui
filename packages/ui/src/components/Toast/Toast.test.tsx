import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Toast, ToastProvider, useToast } from "./Toast";

// ─── Toast unit tests ───

describe("Toast", () => {
  it("renders with title", () => {
    render(<Toast title="Test title" />);
    expect(screen.getByText("Test title")).toBeInTheDocument();
  });

  it("renders with title and description", () => {
    render(<Toast title="Test title" description="Test description" />);
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("has role alert and aria-live polite", () => {
    render(<Toast title="Test" />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("aria-live", "polite");
  });

  it("renders close button when onClose is provided", () => {
    const onClose = vi.fn();
    render(<Toast title="Test" onClose={onClose} />);
    expect(screen.getByLabelText("Close")).toBeInTheDocument();
  });

  it("does not render close button when onClose is not provided", () => {
    render(<Toast title="Test" />);
    expect(screen.queryByLabelText("Close")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Toast title="Test" onClose={onClose} />);

    await user.click(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("auto-dismisses after duration", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast title="Test" duration={3000} onClose={onClose} />);

    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it("does not auto-dismiss when duration is 0", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast title="Test" duration={0} onClose={onClose} />);

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(onClose).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Toast title="Test" variant="info" />);
    const alert = screen.getByRole("alert");
    expect(alert.className).toContain("border-l-primary-500");

    rerender(<Toast title="Test" variant="success" />);
    expect(screen.getByRole("alert").className).toContain("border-l-success-500");

    rerender(<Toast title="Test" variant="warning" />);
    expect(screen.getByRole("alert").className).toContain("border-l-warning-500");

    rerender(<Toast title="Test" variant="error" />);
    expect(screen.getByRole("alert").className).toContain("border-l-error-500");
  });
});

// ─── ToastProvider + useToast tests ───

const TestConsumer: React.FC = () => {
  const { toast } = useToast();
  return (
    <div>
      <button
        onClick={() =>
          toast({ title: "Info toast", variant: "info", duration: 5000 })
        }
      >
        Show info
      </button>
      <button
        onClick={() =>
          toast({ title: "Success toast", variant: "success", duration: 5000 })
        }
      >
        Show success
      </button>
      <button
        onClick={() =>
          toast({ title: "Error toast", variant: "error", duration: 0 })
        }
      >
        Show error
      </button>
    </div>
  );
};

describe("ToastProvider + useToast", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows a toast when toast() is called", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show info"));

    await waitFor(() => {
      expect(screen.getByText("Info toast")).toBeInTheDocument();
    });
  });

  it("auto-dismisses toast after duration", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show info"));

    await waitFor(() => {
      expect(screen.getByText("Info toast")).toBeInTheDocument();
    });

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(screen.queryByText("Info toast")).not.toBeInTheDocument();
    });
  });

  it("allows manual close via X button", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show info"));

    await waitFor(() => {
      expect(screen.getByText("Info toast")).toBeInTheDocument();
    });

    await user.click(screen.getByLabelText("Close"));

    await waitFor(() => {
      expect(screen.queryByText("Info toast")).not.toBeInTheDocument();
    });
  });

  it("can queue multiple toasts", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show info"));
    await user.click(screen.getByText("Show success"));

    await waitFor(() => {
      expect(screen.getByText("Info toast")).toBeInTheDocument();
      expect(screen.getByText("Success toast")).toBeInTheDocument();
    });
  });

  it("throws error when useToast is used outside ToastProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const BadConsumer = () => {
      useToast();
      return null;
    };

    expect(() => render(<BadConsumer />)).toThrow(
      "useToast must be used within a ToastProvider",
    );

    spy.mockRestore();
  });
});
