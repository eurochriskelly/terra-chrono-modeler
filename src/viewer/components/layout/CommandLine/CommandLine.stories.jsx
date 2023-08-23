import React from 'react';
import CommandLine from '.';

export default {
    title: 'layout/CommandLine',
    component: CommandLine,
};

const Template = (args) => <CommandLine {...args} />;

export const CL1 = Template.bind({});
CL1.args = {
    primary: true,
    label: 'Button',
};
