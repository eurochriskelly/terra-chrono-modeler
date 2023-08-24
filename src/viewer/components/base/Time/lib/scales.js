export function mapRangeToScale(domain, range, value) {
    // Ensure the domain and range are arrays of length 2
    if (domain.length !== 2 || range.length !== 2) {
        throw new Error("Domain and Range arrays must have length 2.");
    }

    // Calculate the ratio of where 'value' lies within 'domain'
    const ratio = (value - domain[0]) / (domain[1] - domain[0]);

    // Use that ratio to find the corresponding value in 'range'
    return range[0] + ratio * (range[1] - range[0]);
}


export function getDiscreteValues(range, interval) {
    const start = Math.ceil(range[0] / interval) * interval;
    const end = range[1];
    let values = [];

    for (let value = start; value <= end; value += interval) {
        values.push(value);
    }

    return values;
}
