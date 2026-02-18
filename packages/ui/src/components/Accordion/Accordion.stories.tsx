import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["single", "multiple"] },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  render: () => (
    <Accordion type="single">
      <AccordionItem value="item1" title="What is your return policy?">
        We offer a 30-day return policy for all unused items in their original packaging.
      </AccordionItem>
      <AccordionItem value="item2" title="How long does shipping take?">
        Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business
        days.
      </AccordionItem>
      <AccordionItem value="item3" title="Do you ship internationally?">
        Yes, we ship to over 50 countries worldwide. International shipping rates apply.
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["item1"]}>
      <AccordionItem value="item1" title="Section A">
        This section is open by default.
      </AccordionItem>
      <AccordionItem value="item2" title="Section B">
        You can open multiple sections at once.
      </AccordionItem>
      <AccordionItem value="item3" title="Section C">
        All sections can be open simultaneously.
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Accordion type="single">
      <AccordionItem value="item1" title="Active Item">
        This item can be expanded.
      </AccordionItem>
      <AccordionItem value="item2" title="Disabled Item" disabled>
        This item cannot be expanded.
      </AccordionItem>
      <AccordionItem value="item3" title="Another Active Item">
        This item can also be expanded.
      </AccordionItem>
    </Accordion>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Accordion type="single" defaultValue={["item2"]}>
      <AccordionItem value="item1" title="First">
        First content
      </AccordionItem>
      <AccordionItem value="item2" title="Second (Default Open)">
        This item starts open.
      </AccordionItem>
      <AccordionItem value="item3" title="Third">
        Third content
      </AccordionItem>
    </Accordion>
  ),
};
