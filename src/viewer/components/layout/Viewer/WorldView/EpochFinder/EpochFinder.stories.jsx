import React from 'react';
import { BAR_WIDTH } from './lib/config';
import { periods } from './lib/geological-time-chart';
import EpochFinder from '.';

export default {
    title: 'layout/Viewer/WorldView/EpochFinder',
    component: EpochFinder
};

const Template = (args) => (
    <div style={{ width: `${(BAR_WIDTH + 10)}px` }}>
        <EpochFinder {...args} />
    </div>
)

export const basic = Template.bind({});
basic.args = {
    periods,
};
