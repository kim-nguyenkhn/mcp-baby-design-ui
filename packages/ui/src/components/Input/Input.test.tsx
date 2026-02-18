import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("renders placeholder text", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("shows error message and sets aria-invalid", () => {
    render(<Input label="Name" error="Required field" />);
    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("links error text via aria-describedby", () => {
    render(<Input label="Name" error="Required" />);
    const input = screen.getByLabelText("Name");
    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    const helperEl = document.getElementById(describedBy!);
    expect(helperEl).toHaveTextContent("Required");
  });

  it("shows helper text", () => {
    render(<Input helperText="Enter your email address" />);
    expect(screen.getByText("Enter your email address")).toBeInTheDocument();
  });

  it("updates character count on typing", async () => {
    const user = userEvent.setup();
    render(<Input label="Bio" maxLength={100} />);
    const input = screen.getByLabelText("Bio");
    await user.type(input, "Hello");
    expect(screen.getByTestId("char-count")).toHaveTextContent("5/100");
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    render(<Input label="Password" type="password" />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", { name: "Show password" });
    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    const hideButton = screen.getByRole("button", { name: "Hide password" });
    await user.click(hideButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input label="Disabled" disabled />);
    expect(screen.getByLabelText("Disabled")).toBeDisabled();
  });

  it("calls onChange handler", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="Test" onChange={onChange} />);
    await user.type(screen.getByLabelText("Test"), "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
