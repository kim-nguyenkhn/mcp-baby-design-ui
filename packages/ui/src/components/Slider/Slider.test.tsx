import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders with role slider", () => {
    render(<Slider />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Slider label="Volume" />);
    expect(screen.getByText("Volume")).toBeInTheDocument();
  });

  it("shows current value when showValue is true", () => {
    render(<Slider value={50} showValue />);
    expect(screen.getByTestId("slider-value")).toHaveTextContent("50");
  });

  it("has correct ARIA attributes", () => {
    render(<Slider value={30} min={0} max={100} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(slider).toHaveAttribute("aria-valuenow", "30");
  });

  it("handles keyboard arrow right to increase value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Slider value={50} min={0} max={100} step={1} onChange={onChange} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith(51);
  });

  it("handles keyboard arrow left to decrease value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Slider value={50} min={0} max={100} step={1} onChange={onChange} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenCalledWith(49);
  });

  it("respects min boundary on keyboard", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Slider value={0} min={0} max={100} step={1} onChange={onChange} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    await user.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("respects max boundary on keyboard", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Slider value={100} min={0} max={100} step={1} onChange={onChange} />);
    const slider = screen.getByRole("slider");
    slider.focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it("disables interaction when disabled", () => {
    render(<Slider disabled value={50} />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-disabled", "true");
    expect(slider).toHaveAttribute("tabindex", "-1");
  });

  it("renders filled track proportional to value", () => {
    render(<Slider value={75} min={0} max={100} />);
    const filledTrack = screen.getByTestId("slider-filled-track");
    expect(filledTrack.style.width).toBe("75%");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Slider ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
