import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders an image when src is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
    const avatar = screen.getByLabelText("User");
    expect(avatar).toBeInTheDocument();
    const imgEl = avatar.querySelector("img");
    expect(imgEl).toBeTruthy();
    expect(imgEl!.getAttribute("src")).toBe("https://example.com/avatar.jpg");
  });

  it("shows fallback initials when no src is provided", () => {
    render(<Avatar fallback="JD" />);
    expect(screen.getByTestId("avatar-fallback")).toHaveTextContent("JD");
  });

  it("falls back to initials on image error", () => {
    render(
      <Avatar src="https://broken.com/img.jpg" alt="User" fallback="AB" />,
    );
    const avatar = screen.getByLabelText("User");
    const img = avatar.querySelector("img")!;
    fireEvent.error(img);
    expect(screen.getByTestId("avatar-fallback")).toHaveTextContent("AB");
  });

  it("applies circle shape by default", () => {
    render(<Avatar fallback="JD" />);
    const avatar = screen.getByLabelText("JD");
    expect(avatar.className).toContain("rounded-full");
  });

  it("applies square shape", () => {
    render(<Avatar fallback="JD" shape="square" />);
    const avatar = screen.getByLabelText("JD");
    expect(avatar.className).toContain("rounded-md");
  });

  it("applies xs size", () => {
    render(<Avatar fallback="JD" size="xs" />);
    const avatar = screen.getByLabelText("JD");
    expect(avatar.className).toContain("w-6");
    expect(avatar.className).toContain("h-6");
  });

  it("applies sm size", () => {
    render(<Avatar fallback="JD" size="sm" />);
    const avatar = screen.getByLabelText("JD");
    expect(avatar.className).toContain("w-8");
    expect(avatar.className).toContain("h-8");
  });

  it("applies md size (default)", () => {
    render(<Avatar fallback="JD" />);
    const avatar = screen.getByLabelText("JD");
    expect(avatar.className).toContain("w-10");
    expect(avatar.className).toContain("h-10");
  });

  it("applies lg size", () => {
    render(<Avatar fallback="JD" size="lg" />);
    const avatar = screen.getByLabelText("JD");
    expect(avatar.className).toContain("w-12");
    expect(avatar.className).toContain("h-12");
  });

  it("applies xl size", () => {
    render(<Avatar fallback="JD" size="xl" />);
    const avatar = screen.getByLabelText("JD");
    expect(avatar.className).toContain("w-16");
    expect(avatar.className).toContain("h-16");
  });

  it("uses alt text as aria-label", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="John Doe" />);
    expect(screen.getByLabelText("John Doe")).toBeInTheDocument();
  });

  it("uses fallback text as aria-label when no alt", () => {
    render(<Avatar fallback="JD" />);
    expect(screen.getByLabelText("JD")).toBeInTheDocument();
  });

  it("applies a colored background from fallback hash", () => {
    render(<Avatar fallback="AB" />);
    const avatar = screen.getByLabelText("AB");
    const hasBgColor = avatar.className.match(/bg-(primary|error|neutral)-\d+/);
    expect(hasBgColor).toBeTruthy();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Avatar ref={ref} fallback="JD" />);
    expect(ref).toHaveBeenCalled();
  });
});
