import React from 'react';

import { mapRangeToScale, getDiscreteValues } from './lib/scales'

const STROKE_COLOR = 'white'
const TICK_DEFINITIONS = [
    { interval: 0.2, height: 1.8, style: { stroke: '#777', strokeWidth: 0.5 } },
    { interval: 1, height: 4 },
    { interval: 10, height: 8, style: {} },
    { interval: 50, height: 12, style: { strokeWidth: 1.1 } },
    { interval: 100, height: 16, style: { strokeWidth: 1.4 } },
    { interval: 500, height: 20, style: { strokeWidth: 1.8 } },
];

/**
 * This component accepts children that are rendered at provided locations on the timeline.
 *
 */
const TimeLine = ({ startMa, endMa, width, children }) => {
    const ticks = [
        {
            type: `Manual`,
            position: endMa,
            height: 48,
            style: {
                stroke: 'blue',
                strokeWidth: 4,
            }
        }
    ].slice(1)

    TICK_DEFINITIONS.forEach(({ interval, height, style = {} }) => {
        const dvals = getDiscreteValues([-startMa, -endMa], interval)
        let gap = 100
        if (width / dvals.length > 5) {
            dvals.forEach((d, index) => {
                ticks.push({
                    type: `${interval}Ma`,
                    position: mapRangeToScale([-startMa, -endMa], [0, width], d),
                    height,
                    style: {
                        stroke: 'white',
                        opacity: 0.4,
                        transparence: true,
                        ...style,
                        strokeWidth: (style.strokeWidth || 1) * Math.min(1.4, (width / 500)),
                    },
                })
            })
        }
    })

    // mirror svg group about horizontal axis
    const transform = `translate(0, 30) scale(1, -1)`
    return (
        <svg width="100%" height="40px" style={{ background: 'none' }}>
            <g transform={transform}>
                {ticks
                    // .filter(x => x.type !== 'Manual')
                    // .filter(x => x.type !== '50Ma')
                    // .filter(x => x.type !== '500Ma')
                    // .slice(0, 10)
                    .map(({ type, position, height, style }, index) => (
                        <line
                            key={`l${index}`}
                            x1={position}
                            y1={height}
                            x2={position}
                            y2={0}
                            style={style}
                        />
                    ))}
                {
                    React.Children.map(children, child => {
                        // Double the value of the 'x' prop for each child
                        const newX = mapRangeToScale([-startMa, -endMa], [0, width], -(child.props.xPos))
                        console.log({newX})
                        return React.cloneElement(child, { xPos: newX });
                    })
                }
            </g>
        </svg>
    );
};

export default TimeLine;
