import { BAR_WIDTH } from './config'

function getDimensions(width, periods = [], selected, totalDuration, left) {
    const boundaries = [
        ...(periods || []).map((_, index) => periods
            .slice(0, index)
            .reduce((acc, p) => acc + ((p.start - p.end) / totalDuration * width), left)),
        width
    ]
    return {
        boundaries,
        widths: boundaries.map((w, index) => index === 0 ? w : w - boundaries[index - 1]).slice(1)
    }
}

export const getTotalDuration = (periods) => {
    return periods.reduce((acc, period) => acc + (period.start - period.end), 0);
}

export function getTimespans(periods, children = []) {
    let currentLevel = periods;
    for (let child of children) {
        const found = currentLevel.find(period => period.name === child);
        if (found && found.children) {
            currentLevel = found.children;
        } else {
            // If there's no children at the requested level, or the name doesn't match,
            // return an empty array.
            return [];
        }
    }
    return currentLevel
}

export function setupPositions(width, positions, timespans, periodType, selected) {
    // let { boundaries, widths } = positions.eons
    const { current, to } = periodType
    const key = x => `${x}s`
    const totalDuration = getTotalDuration(timespans)
    let { left } = positions[key(current)]

    let { boundaries, widths } = getDimensions(
        width, timespans, selected, totalDuration, left
    )
    let sumWidths = widths.reduce((acc, w) => acc + w, 0)
    // For the selected period, we ignore the calulated width and maximize the
    // width of the selected period.
    positions[key(current)] = { ...positions[key(current)], boundaries, widths, sumWidths }
    positions[key(to)] = { ...positions[key(current)], left }
 }
