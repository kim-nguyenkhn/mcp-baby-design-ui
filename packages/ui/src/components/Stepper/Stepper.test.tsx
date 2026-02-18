import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Stepper } from "./Stepper";

const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Review", description: "Review and confirm" },
];

describe("Stepper", () => {
  it("renders all step labels", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByText("Create your account")).toBeInTheDocument();
  });

  it("highlights the active step with aria-current", () => {
    render(<Stepper steps={steps} activeStep={1} />);
    const activeLabel = screen.getByText("Profile").closest("[aria-current]");
    expect(activeLabel).toHaveAttribute("aria-current", "step");
  });

  it("shows check icon for completed steps", () => {
    render(<Stepper steps={steps} activeStep={2} />);
    expect(screen.getByTestId("step-check-0")).toBeInTheDocument();
    expect(screen.getByTestId("step-check-1")).toBeInTheDocument();
  });

  it("shows number for incomplete and active steps", () => {
    render(<Stepper steps={steps} activeStep={0} />);
    expect(screen.getByTestId("step-circle-0")).toHaveTextContent("1");
    expect(screen.getByTestId("step-circle-1")).toHaveTextContent("2");
    expect(screen.getByTestId("step-circle-2")).toHaveTextContent("3");
  });

  it("applies completed styles to completed step circles", () => {
    render(<Stepper steps={steps} activeStep={2} />);
    const completedCircle = screen.getByTestId("step-circle-0");
    expect(completedCircle.className).toContain("bg-primary-500");
  });

  it("renders bar variant", () => {
    render(<Stepper steps={steps} activeStep={1} variant="bar" />);
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("renders vertical orientation", () => {
    const { container } = render(
      <Stepper steps={steps} activeStep={1} orientation="vertical" />,
    );
    const stepper = container.firstChild;
    expect((stepper as HTMLElement).className).toContain("flex-col");
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Stepper ref={ref} steps={steps} activeStep={0} />);
    expect(ref).toHaveBeenCalled();
  });
});
