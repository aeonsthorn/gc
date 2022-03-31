import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";


import __Component__, { docProps } from ".";

export default {
  title: "Components/__Component__",
  component: __Component__,
} as ComponentMeta<typeof __Component__>;

const Template: ComponentStory<typeof __Component__> = (args) => (
  <__Component__ {...args} />
);
export const Doc = Template.bind({});
Doc.args = docProps;

export const Default = Template.bind({});
Default.args = {
  // args here
}
