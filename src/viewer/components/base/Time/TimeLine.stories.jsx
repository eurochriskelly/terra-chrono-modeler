import React from 'react';
import TimeLine from './TimeLine';

export default {
    title: 'base/Time/TimeLine',
    component: TimeLine,
};

const Template = (args) => (
    <div>
        <h1>Timeline</h1>
        <svg width="100%" height="900px" style={{ background: '#ffffcc' }}>
            <TimeLine {...args} />
        </svg>
    </div>
)

export const TLZoomed = Template.bind({});
TLZoomed.args = {
    startMa: 540,
    endMa: 23,
    width: 600
}

export const TLZoomed2 = Template.bind({});
TLZoomed2.args = {
    startMa: 23,
    endMa: 9,
    width: 400
}
