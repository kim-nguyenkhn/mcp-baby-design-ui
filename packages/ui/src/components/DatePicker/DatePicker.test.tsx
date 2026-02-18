import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders with placeholder", () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<DatePicker label="Birthday" />);
    expect(screen.getByText("Birthday")).toBeInTheDocument();
  });

  it("displays formatted selected date", () => {
    const date = new Date(2024, 5, 15); // June 15, 2024
    render(<DatePicker value={date} format="MM/DD/YYYY" />);
    expect(screen.getByText("06/15/2024")).toBeInTheDocument();
  });

  it("opens calendar on click", async () => {
    const user = userEvent.setup();
    render(<DatePicker />);
    await user.click(screen.getByTestId("datepicker-trigger"));
    expect(screen.getByTestId("datepicker-calendar")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("selects a date", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePicker onChange={onChange} />);
    await user.click(screen.getByTestId("datepicker-trigger"));
    await user.click(screen.getByTestId("datepicker-day-15"));
    expect(onChange).toHaveBeenCalled();
    const selectedDate = onChange.mock.calls[0][0] as Date;
    expect(selectedDate.getDate()).toBe(15);
  });

  it("closes calendar after date selection", async () => {
    const user = userEvent.setup();
    render(<DatePicker onChange={vi.fn()} />);
    await user.click(screen.getByTestId("datepicker-trigger"));
    await user.click(screen.getByTestId("datepicker-day-10"));
    expect(screen.queryByTestId("datepicker-calendar")).not.toBeInTheDocument();
  });

  it("navigates to next month", async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2024, 0, 1)} />);
    await user.click(screen.getByTestId("datepicker-trigger"));
    expect(screen.getByTestId("datepicker-month-year")).toHaveTextContent("January 2024");
    await user.click(screen.getByTestId("datepicker-next"));
    expect(screen.getByTestId("datepicker-month-year")).toHaveTextContent("February 2024");
  });

  it("navigates to previous month", async () => {
    const user = userEvent.setup();
    render(<DatePicker value={new Date(2024, 2, 1)} />);
    await user.click(screen.getByTestId("datepicker-trigger"));
    expect(screen.getByTestId("datepicker-month-year")).toHaveTextContent("March 2024");
    await user.click(screen.getByTestId("datepicker-prev"));
    expect(screen.getByTestId("datepicker-month-year")).toHaveTextContent("February 2024");
  });

  it("respects minDate", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const minDate = new Date(2024, 0, 15);
    render(<DatePicker value={new Date(2024, 0, 20)} minDate={minDate} onChange={onChange} />);
    await user.click(screen.getByTestId("datepicker-trigger"));
    // Day 10 should be disabled (before minDate)
    const day10 = screen.getByTestId("datepicker-day-10");
    expect(day10).toHaveAttribute("aria-disabled", "true");
    await user.click(day10);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("respects maxDate", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const maxDate = new Date(2024, 0, 20);
    render(<DatePicker value={new Date(2024, 0, 10)} maxDate={maxDate} onChange={onChange} />);
    await user.click(screen.getByTestId("datepicker-trigger"));
    // Day 25 should be disabled (after maxDate)
    const day25 = screen.getByTestId("datepicker-day-25");
    expect(day25).toHaveAttribute("aria-disabled", "true");
    await user.click(day25);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled />);
    await user.click(screen.getByTestId("datepicker-trigger"));
    expect(screen.queryByTestId("datepicker-calendar")).not.toBeInTheDocument();
  });
});
