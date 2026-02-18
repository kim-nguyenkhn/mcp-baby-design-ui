import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("Select", () => {
  it("renders with placeholder", () => {
    render(<Select options={options} placeholder="Choose fruit" />);
    expect(screen.getByText("Choose fruit")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Select options={options} label="Fruit" />);
    expect(screen.getByText("Fruit")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(<Select options={options} />);
    await user.click(screen.getByTestId("select-trigger"));
    expect(screen.getByTestId("select-dropdown")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });

  it("selects an option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await user.click(screen.getByTestId("select-trigger"));
    await user.click(screen.getByTestId("select-option-banana"));
    expect(onChange).toHaveBeenCalledWith("banana");
  });

  it("shows selected value", () => {
    render(<Select options={options} value="cherry" />);
    expect(screen.getByText("Cherry")).toBeInTheDocument();
  });

  it("closes dropdown after selection in single mode", async () => {
    const user = userEvent.setup();
    render(<Select options={options} onChange={vi.fn()} />);
    await user.click(screen.getByTestId("select-trigger"));
    await user.click(screen.getByTestId("select-option-apple"));
    expect(screen.queryByTestId("select-dropdown")).not.toBeInTheDocument();
  });

  it("filters options when searchable", async () => {
    const user = userEvent.setup();
    render(<Select options={options} searchable />);
    await user.click(screen.getByTestId("select-trigger"));
    const searchInput = screen.getByTestId("select-search");
    await user.type(searchInput, "ban");
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  });

  it("supports multi-select", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select options={options} multiple value={["apple"]} onChange={onChange} />,
    );
    await user.click(screen.getByTestId("select-trigger"));
    await user.click(screen.getByTestId("select-option-banana"));
    expect(onChange).toHaveBeenCalledWith(["apple", "banana"]);
  });

  it("removes tag in multi-select", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select options={options} multiple value={["apple", "banana"]} onChange={onChange} />,
    );
    const removeButtons = screen.getAllByLabelText(/Remove/);
    await user.click(removeButtons[0]);
    expect(onChange).toHaveBeenCalledWith(["banana"]);
  });

  it("shows error message", () => {
    render(<Select options={options} error="Selection required" />);
    expect(screen.getByText("Selection required")).toBeInTheDocument();
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<Select options={options} disabled />);
    await user.click(screen.getByTestId("select-trigger"));
    expect(screen.queryByTestId("select-dropdown")).not.toBeInTheDocument();
  });

  it("has combobox role when searchable", async () => {
    const user = userEvent.setup();
    render(<Select options={options} searchable />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
