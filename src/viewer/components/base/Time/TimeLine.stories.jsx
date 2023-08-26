import React from 'react';
import TimeLine from './TimeLine';
import Planet from './Planet';

export default {
    title: 'base/Time/TimeLine',
    component: TimeLine,
};

const Template = (args) => (
    <div style={{
        background: '#443333',
        height: '600px',
    }}>
        <svg width="100%" height="900px" style={{ background: 'none' }}>
            <TimeLine {...args} />
        </svg>
    </div>
)



export const TLZoomed = Template.bind({});
TLZoomed.args = {
    startMa: 540,
    endMa: 23,
    width: 600,
    children: [
        <Planet radius={5} xPos={520.2} yPos={32} />,
        <Planet radius={7.5} xPos={304.8} yPos={32} />,
        <Planet radius={10} xPos={43} yPos={32} />,
    ]
}

export const TLZoomed2 = Template.bind({});
TLZoomed2.args = {
    startMa: 23,
    endMa: 9,
    width: 400,
    children: [
        <Planet radius={5} xPos={19} yPos={28} />,
        <Planet radius={6} xPos={17.5} yPos={28} />,
        <Planet radius={10} xPos={13} yPos={28} />,
    ]
}
