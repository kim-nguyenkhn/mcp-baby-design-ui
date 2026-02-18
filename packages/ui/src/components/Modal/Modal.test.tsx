import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./Modal";

// Helper to render a fully controlled modal
const ControlledModal: React.FC<{
  defaultOpen?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}> = ({ defaultOpen = true, size = "md" }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} onClose={() => setOpen(false)} size={size}>
        <ModalHeader>Test Modal Title</ModalHeader>
        <ModalBody>
          <p>Modal body content</p>
          <input type="text" placeholder="First input" />
          <input type="text" placeholder="Second input" />
        </ModalBody>
        <ModalFooter>
          <button onClick={() => setOpen(false)}>Cancel</button>
          <button onClick={() => setOpen(false)}>Confirm</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

describe("Modal", () => {
  it("renders children when open", () => {
    render(<ControlledModal defaultOpen={true} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Modal body content")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(<ControlledModal defaultOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(<ControlledModal defaultOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByText("Open modal"));

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("closes when ESC key is pressed", async () => {
    const user = userEvent.setup();

    render(<ControlledModal defaultOpen={true} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes when backdrop is clicked", async () => {
    const user = userEvent.setup();

    render(<ControlledModal defaultOpen={true} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // The backdrop is the overlay div that wraps the dialog
    const overlay = screen.getByRole("dialog").parentElement!;
    await user.click(overlay);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes when close button in header is clicked", async () => {
    const user = userEvent.setup();

    render(<ControlledModal defaultOpen={true} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Close modal"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("has correct ARIA attributes", () => {
    render(<ControlledModal defaultOpen={true} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby");

    const labelledById = dialog.getAttribute("aria-labelledby")!;
    const title = document.getElementById(labelledById);
    expect(title).toHaveTextContent("Test Modal Title");
  });

  it("applies size variants", () => {
    const { rerender } = render(<ControlledModal defaultOpen={true} size="sm" />);
    expect(screen.getByRole("dialog").className).toContain("max-w-sm");

    rerender(<ControlledModal defaultOpen={true} size="lg" />);
    expect(screen.getByRole("dialog").className).toContain("max-w-lg");

    rerender(<ControlledModal defaultOpen={true} size="xl" />);
    expect(screen.getByRole("dialog").className).toContain("max-w-xl");
  });

  it("locks body scroll when open", () => {
    const { unmount } = render(<ControlledModal defaultOpen={true} />);

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
  });

  it("renders compound components correctly", () => {
    render(<ControlledModal defaultOpen={true} />);

    // ModalHeader
    expect(screen.getByText("Test Modal Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Close modal")).toBeInTheDocument();

    // ModalBody
    expect(screen.getByText("Modal body content")).toBeInTheDocument();

    // ModalFooter
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });

  it("does not close when clicking inside modal content", async () => {
    const user = userEvent.setup();

    render(<ControlledModal defaultOpen={true} />);

    await user.click(screen.getByText("Modal body content"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
