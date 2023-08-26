import React, { useState } from 'react';
import chroma from 'chroma-js';

import './Period.css'

function Period({
    data,
    barWidth, totalDuration,
    isSelected, isSiblingSelected,
    onSelect,
    x, y,
    gradientId,
}) {
    const { name, start, end, color } = data;
    const [expanded, setExpanded] = useState(false);
    const duration = start - end;

    const width =  (duration / totalDuration * barWidth)

    return (
        <g className="periodGroup" onClick={() => {
            setExpanded(!expanded);
            onSelect();
        }} transform={`translate(${x + 2}, ${y +3})`}>
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={color} stopOpacity={1.0} />
                    <stop offset="3%" stopColor={color} stopOpacity={0.5} />
                    <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                    <stop offset="80%" stopColor={color} stopOpacity={0} />
                </linearGradient>
            </defs>
            <rect
                width={width - 6}
                height="100%" // xxx
                fill={`url(#${gradientId})`}
            />
            <text x={5} y="14"
                fontFamily='sans-serif'
                fontSize={15}
                fill={'black'}
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
