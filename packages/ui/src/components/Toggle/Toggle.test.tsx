import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders with role switch", () => {
    render(<Toggle />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Toggle label="Dark mode" />);
    expect(screen.getByText("Dark mode")).toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Toggle />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("shows checked state", () => {
    render(<Toggle checked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("toggles off on click when checked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle checked={true} onChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Toggle disabled onChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("has disabled attribute when disabled", () => {
    render(<Toggle disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Toggle ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
