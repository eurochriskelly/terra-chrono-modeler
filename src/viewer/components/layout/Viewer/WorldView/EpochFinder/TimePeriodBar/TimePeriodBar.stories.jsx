import React from 'react';
import TimePeriodBar from '.';
import { BAR_WIDTH } from '../lib/config';
import { periods } from '../lib/geological-time-chart';

export default {
    title: 'layout/Viewer/WorldView/TimePeriodBar',
    component: TimePeriodBar,
};

const Template = (args) => (
    <div style={{ width: `${(BAR_WIDTH + 20)}px`, display: 'flex', background: '#eee' }}>
        <TimePeriodBar {...args} />
    </div>
)

export const basic = Template.bind({});
basic.args = {
    periods,
};
