import React from 'react';

import __Component__ from './__Component__';

export default {
  /* ๐ The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: '__Component__',
  component: __Component__,
};

// ๐ We create a โtemplateโ of how args map to rendering
const Template = (args) => <__Component__ {...args} />;

// ๐ Each story then reuses that template
export const Default = Template.bind({});
Default.args = {};
