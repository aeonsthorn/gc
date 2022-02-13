import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Yolo from ".";
export default {
  title: "Components/Component",
  component: Yolo,
} as ComponentMeta<typeof Yolo>;
const Template: ComponentStory<typeof Yolo> = (args) => (
  <Yolo {...args} />
);
export const Default = Template.bind({});
Default.args = {
  // args here
};
