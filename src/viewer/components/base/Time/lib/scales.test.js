import { mapRangeToScale, getDiscreteValues } from "./scales";

describe("mapRangeToScale", () => {

    it('maps a range to a scale', () => {
        const startRange = -540;
        const endRange = -23;
        const scaleWidth = 500;

        const position1 = mapRangeToScale([startRange, endRange], [0, scaleWidth], -500);
        expect(position1).toBeGreaterThan(38)
        expect(position1).toBeLessThan(39)

        const domain = [-2000, -1000];
        const range = [0, 30];
        const value = -1750;
        const result = mapRangeToScale(domain, range, value)

        expect(result).toBe(7.5)


    })

    it('finds discreet values', () => {
        const range = [-2020, -124];
        const interval = 500;
        const result = getDiscreteValues(range, interval)
        expect(result).toHaveLength(4)
    })

})
