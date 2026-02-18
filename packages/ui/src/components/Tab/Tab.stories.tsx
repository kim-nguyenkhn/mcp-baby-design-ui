import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabList, TabItem, TabPanel } from "./Tab";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Horizontal: Story = {
  render: function HorizontalTabs() {
    const [value, setValue] = React.useState("tab1");
    return (
      <Tabs value={value} onChange={setValue}>
        <TabList>
          <TabItem value="tab1" label="Account" />
          <TabItem value="tab2" label="Security" />
          <TabItem value="tab3" label="Notifications" />
        </TabList>
        <TabPanel value="tab1">Account settings content</TabPanel>
        <TabPanel value="tab2">Security settings content</TabPanel>
        <TabPanel value="tab3">Notification preferences content</TabPanel>
      </Tabs>
    );
  },
};

export const Vertical: Story = {
  render: function VerticalTabs() {
    const [value, setValue] = React.useState("tab1");
    return (
      <Tabs value={value} onChange={setValue} orientation="vertical">
        <TabList>
          <TabItem value="tab1" label="Profile" />
          <TabItem value="tab2" label="Settings" />
          <TabItem value="tab3" label="Billing" />
        </TabList>
        <TabPanel value="tab1">Profile content</TabPanel>
        <TabPanel value="tab2">Settings content</TabPanel>
        <TabPanel value="tab3">Billing content</TabPanel>
      </Tabs>
    );
  },
};

export const WithDisabled: Story = {
  render: function DisabledTabs() {
    const [value, setValue] = React.useState("tab1");
    return (
      <Tabs value={value} onChange={setValue}>
        <TabList>
          <TabItem value="tab1" label="Active" />
          <TabItem value="tab2" label="Disabled" disabled />
          <TabItem value="tab3" label="Another" />
        </TabList>
        <TabPanel value="tab1">Active content</TabPanel>
        <TabPanel value="tab2">Disabled content</TabPanel>
        <TabPanel value="tab3">Another content</TabPanel>
      </Tabs>
    );
  },
};
