import React, { useState } from 'react';
import Period from '../Period';
import { logMaker } from '../../../../../../common/logging'
import { getTimespans, getTotalDuration, setupPositions } from '../lib/positioning';

const ii = logMaker('TimePeriodBar', 'ii')

function TimePeriodBar({ periods, selections, width = 800}) {
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
        setupPositions(width, positions, timespans, periodType, selectedCurrent)
        const totalDuration = getTotalDuration(timespans)
        const { left } = positions[`${from}s`] || { left: 0 }
        return (timespans && timespans.length &&
            <g className="barGroup"
                key="barGroup"
                transform={`translate(${left}, ${yval})`}>
                {
                    timespans.map((period, index) => (
                        <Period
                            periods={timespans}
                            key={`p${index}`}
                            gradientId={`linearDown${index}`}
                            data={period}
                            totalDuration={totalDuration}
                            isSelected={selectedCurrent === period.name}
                            isSiblingSelected={selectedCurrent !== null}
                            onSelect={() => {
                                ii(`onSelect: ${period.name}`);
                                setSelectedFn(selectedCurrent === period.name ? null : period.name);
                            }}
                            barWidth={width}
                            x={positions[`${current}s`].boundaries[index]}
                            y={0}
                        />
                    ))}
            </g>
        )
    }

    return (
        <div>
            <svg width={width} height="100%">
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
