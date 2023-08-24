import React from 'react';
import TimeLine from './TimeLine';

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

const Planet = ({ radius, xPos, yPos }) => {
    return (
        <g>
            <defs>
                <linearGradient id="linearGradient">
                    <stop style={{ stopColor: '#000099', stopOpacity: 1 }} offset="0" id="stop6455" />
                    <stop style={{ stopColor: '#000000', stopOpacity: 1 }} offset="1" id="stop6457" />
                </linearGradient>
                <radialGradient cx="171.20810" cy="196.85463" r="200" fx="171.20810" fy="196.85463" id="radialGradient" href="#linearGradient" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.040418,0.796229,-0.814518,1.064316,153.4218,-150.4353)" />
            </defs>
            <circle
                cx={xPos} cy={yPos} r={radius*1.3}
                fill="#ffffff" opacity={0.1}
            />
            <circle
                cx={xPos} cy={ yPos} r={ radius}
                fill="url(#linearGradient)"
                opacity={0.7}
            />
        </g>
    )

}

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
