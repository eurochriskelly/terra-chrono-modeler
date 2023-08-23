import React, { useState } from 'react';
import Period from '../Period';
import { logMaker } from '../../../../../../common/logging'
import { getTimespans, getTotalDuration, setupPositions } from '../lib/positioning';

import { BAR_WIDTH } from '../lib/config';

const ii = logMaker('TimePeriodBar', 'ii')

function TimePeriodBar({ periods, selections }) {
    const {
        selectedEon, selectedEra, selectedPeriod, selectedEpoch,
        setSelectedEon, setSelectedEra, setSelectedPeriod, setSelectedEpoch
    } = selections

    const [positions, setPositions] = useState({
        eons: { widths: [], boundaries: [], left: 0 },
        eras: { widths: [], boundaries: [], left: 0 },
        periods: { widths: [], boundaries: [] },
        epochs: { widths: [], boundaries: [] },
    })

    const buildTimespanRow = (
        timespans,
        selectedCurrent,
        setSelectedFn,
        periodType,
        yval = 0
    ) => {
        const { from, current } = periodType
        if (!timespans) return null
        setupPositions(positions, timespans, periodType, selectedCurrent)
        const totalDuration = getTotalDuration(timespans)
        const { left } = positions[`${from}s`] || { left: 0 }
        return (timespans && timespans.length &&
            <g className="barGroup" transform={`translate(${left}, ${yval})`}>
                {
                    timespans.map((period, index) => (
                        <Period
                            periods={timespans}
                            key={index}
                            data={period}
                            totalDuration={totalDuration}
                            isSelected={selectedCurrent === period.name}
                            isSiblingSelected={selectedCurrent !== null}
                            onSelect={() => {
                                ii(`onSelect: ${period.name}`);
                                setSelectedFn(selectedCurrent === period.name ? null : period.name);
                            }}
                            barWidth={BAR_WIDTH}
                            x={positions[`${current}s`].boundaries[index]}
                            defaultWidth={positions[`${current}s`].widths[index]}
                            y={0}
                        />
                    ))}
            </g>
        )
    }

    return (
        <div>
            <svg width={BAR_WIDTH} height="200">
                {
                    selectedEon || buildTimespanRow(
                        getTimespans(periods),
                        selectedEon,
                        setSelectedEon,
                        { from: '', current: 'eon', to: 'era' },
                        0
                    )
                }
                {
                    selectedEra || buildTimespanRow(
                        getTimespans(periods, [selectedEon]),
                        selectedEra,
                        setSelectedEra,
                        { from: 'eon', current: 'era', to: 'period' },
                        0
                    )
                }
                {
                    selectedPeriod || buildTimespanRow(
                        getTimespans(periods, [selectedEon, selectedEra]),
                        selectedPeriod,
                        setSelectedPeriod,
                        { from: 'era', current: 'period', to: 'epoch' },
                        0
                    )
                }
                {
                    selectedEpoch || buildTimespanRow(
                        getTimespans(periods, [selectedEon, selectedEra, selectedPeriod]),
                        selectedEpoch,
                        setSelectedEpoch,
                        { from: 'period', current: 'epoch', to: 'end' },
                        0
                    )
                }
            </svg>
        </div>
    );
}

export default TimePeriodBar;
