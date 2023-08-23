import React from 'react';

import { mapRangeToScale, getDiscreetValues } from './lib/scales'

const TICK_DEFINITIONS = [
    { interval: 0.2, height: 1.8, style: { stroke: '#777', strokeWidth: 0.5 } },
    { interval: 1, height: 4 },
    { interval: 10, height: 8, style: { stroke: 'black' } },
    { interval: 50, height: 16, style: { strokeWidth: 1.3 } },
    { interval: 100, height: 24, style: { strokeWidth: 2, stroke: 'black' } },
    { interval: 500, height: 48, style: { strokeWidth: 3, stroke: 'black' } },
];

const TimeScale = ({ startMa, endMa, width }) => {
    const ticks = [
        {
            type: `Manual`,
            position: endMa,
            height: 48,
            style: {
                stroke: 'blue',
                strokeWidth: 3,
            }
        }
    ]

    TICK_DEFINITIONS.forEach(({ interval, height, style = {} }) => {
        const dvals = getDiscreetValues([-startMa, -endMa], interval)
        let gap = 100
        console.log(width / dvals.length)
        if (width / dvals.length > 5) {
            dvals.forEach((d, index) => {
                ticks.push({
                    type: `${interval}Ma`,
                    position: mapRangeToScale([-startMa, -endMa], [0, width], d),
                    height,
                    style: {
                        stroke: 'black', ...style,
                        strokeWidth: (style.strokeWidth || 1) * Math.min(1.4, (width / 500)),
                    },
                })
            })
        }
    })

    return (
        <g >
            <line x1="0" y1="100" x2={width} y2="100" style={{ stroke: 'red', strokeWidth: 7 }} />
            {ticks
                .filter(x => x.type !== 'Manual')
                // .filter(x => x.type !== '50Ma')
                //.filter(x => x.type !== '500Ma')
                //.slice(0, 10)
                .map(({ type, position, height, style, index }) => (
                    console.log(type) ||
                    < line
                        key={index}
                        x1={position}
                        y1={height}
                        x2={position}
                        y2="0"
                        style={style}
                    />
                ))}
        </g>
    );
};

export default TimeScale;
