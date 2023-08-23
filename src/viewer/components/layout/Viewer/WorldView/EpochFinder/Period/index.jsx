import React, { useState } from 'react';
import chroma from 'chroma-js';

import './Period.css'

function Period({
    data,
    barWidth, totalDuration,
    isSelected, isSiblingSelected,
    onSelect,
    defaultWidth, x, y
}) {
    const { name, start, end, color } = data;
    const [expanded, setExpanded] = useState(false);
    const duration = start - end;


    const width = (!isSelected && isSelected !== false)
        ? (duration / totalDuration * barWidth)
        : defaultWidth;

    return (
        <g className="periodGroup" onClick={() => {
            setExpanded(!expanded);
            onSelect();
        }} transform={`translate(${x + 2}, ${y})`}>
            <rect
                width={width - 4}
                height="45"
                fill={!isSiblingSelected
                    ? color
                    : isSelected
                        ? chroma(color).darken().saturate(2).hex()
                        : chroma(color).brighten(3).desaturate(2).hex()
                }
                stroke={isSelected
                    ? 'black'
                    : 'white'
                }
                strokeWidth={isSelected
                    ? 3
                    : 0.5
                }
            />
            <text x={5} y="14"
                fontFamily='sans-serif'
                fontSize={15}
                fill={!isSiblingSelected
                    ? '#333'
                    : isSelected
                        ? 'white'
                        : '#888'
                }
            >{name.toUpperCase()}</text>

            {/* Start year label */}
            <YearLabel
                start={start}
                isSelected={isSelected}
                isSiblingSelected={isSiblingSelected}
            />
        </g>
    );
}

export default Period;


function YearLabel({
    start, isSelected, isSiblingSelected
}) {
    const fontSize = "11px";  // Define font size for the start and end labels
    return (
        <text x="4" y="41"
            fontSize={fontSize}
            fontFamily='sans-serif'
            // transform="rotate(-90)"
            fill={!isSiblingSelected
                ? '#eee'
                : isSelected
                    ? 'white'
                    : '#aaa'
            }>
            @{start} Ma
        </text>
    )
}
