import { getTimespan, periods } from "./geological-time-chart"

describe('geological-time-chart', () => {
    it('can select by path', () => {
        const res1 = getTimespan(periods, ['Phanerozoic'])
        const res2 = getTimespan(periods, ['Phanerozoic', 'Cenozoic'])
        console.log(res1.color, res2.color)
    })
})
