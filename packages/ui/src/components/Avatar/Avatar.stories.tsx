import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?u=1",
    alt: "John Doe",
    size: "md",
    shape: "circle",
  },
};

export const WithFallback: Story = {
  args: {
    fallback: "JD",
    size: "md",
    shape: "circle",
  },
};

export const Square: Story = {
  args: {
    fallback: "AB",
    size: "lg",
    shape: "square",
  },
};

export const ExtraSmall: Story = {
  args: {
    fallback: "XS",
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    fallback: "SM",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    fallback: "LG",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    src: "https://i.pravatar.cc/150?u=2",
    alt: "Jane Smith",
    size: "xl",
  },
};

export const BrokenImage: Story = {
  args: {
    src: "https://broken-url.example/img.jpg",
    alt: "Broken",
    fallback: "BR",
    size: "md",
  },
};
