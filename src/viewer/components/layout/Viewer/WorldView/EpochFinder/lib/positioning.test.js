import { setupPositions } from "./positioning";

const ts2 = [
    {
        name: "C1.1",
        start: 600,
        end: 580,
        children: []
    },
    {
        name: "C1.2",
        start: 580,
        end: 550,
        children: []
    },
    {
        name: "C1.3",
        start: 550,
        end: 500,
        children: []
    },
]

const ts1 = [
    {
        name: "C1",
        start: 600,
        end: 500,
        children: ts2
    },
    {
        name: "C2",
        start: 500,
        end: 400,
        children: []
    },
]

const timespans = [
    {
        name: "A",
        start: 1000,
        end: 600,
        children: []
    },
    {
        name: "B",
        start: 600,
        end: 400,
        children: []
    },
    {
        name: "C",
        start: 400,
        end: 100,
        children: ts1
    },
    {
        name: "D",
        start: 100,
        end: 0,
        // children: ts1
    },
]

const DEF_POS = () => ({
    roots: { left: 0 },
    eons: { widths: [], boundaries: [], left: 0 },
    eras: { widths: [], boundaries: [], left: 0 },
    periods: { widths: [], boundaries: [] },
    epochs: { widths: [], boundaries: [] },
    selected: {
        eraWidth: 0,
        periodWidth: 0,
        epochWidth: 0,
    }
})

describe('Setting up positions for bars', () => {

    it('sets up positions', () => {
        const positions = DEF_POS()
        setupPositions(
            positions,
            timespans,
            {
                from: "root",
                current: "eon",
                to: "epoch"
            },
            null,
        )
        console.log(positions)
    })
    it('sets up positions for selected period', () => {
        const positions = DEF_POS()
        setupPositions(
            positions,
            timespans,
            {
                from: "root",
                current: "eon",
                to: "era"
            },
            'C',
        )
        console.log(positions)
        console.log(JSON.stringify(positions))
    })
    it('sets up positions for eras', () => {
        const positions = { "roots": { "left": 0 }, "eons": { "widths": [20, 20, 940, 20], "boundaries": [0, 20, 40, 980, 1000], "left": 0, "sumWidths": 1000 }, "eras": { "widths": [], "boundaries": [], "left": 40 }, "periods": { "widths": [], "boundaries": [] }, "epochs": { "widths": [], "boundaries": [] }, "selected": { "eraWidth": 0, "periodWidth": 0, "epochWidth": 0, "eonWidth": 940 } }
        setupPositions(
            positions,
            ts1,
            {
                from: "eon",
                current: "era",
                to: "period"
            },
            'C1',
        )
        console.log(positions)
    })
    it('sets up positions for eras', () => {
        const positions = { "roots": { "left": 0 }, "eons": { "widths": [20, 20, 940, 20], "boundaries": [0, 20, 40, 980, 1000], "left": 0, "sumWidths": 1000 }, "eras": { "widths": [], "boundaries": [], "left": 40 }, "periods": { "widths": [], "boundaries": [] }, "epochs": { "widths": [], "boundaries": [] }, "selected": { "eraWidth": 0, "periodWidth": 0, "epochWidth": 0, "eonWidth": 940 } }
        setupPositions(
            positions,
            ts1,
            {
                from: "eon",
                current: "era",
                to: "period"
            },
            null
        )
        console.log(positions)
        console.log(JSON.stringify(positions))
    })
    it.only('sets up positions for periods', () => {
        const positions = { "roots": { "left": 0 }, "eons": { "widths": [20, 20, 940, 20], "boundaries": [0, 20, 40, 980, 1000], "left": 0, "sumWidths": 1000 }, "eras": { "widths": [500, 460], "boundaries": [40, 540, 1000], "left": 40, "sumWidths": 960 }, "periods": { "widths": [], "boundaries": [], "left": 40 }, "epochs": { "widths": [], "boundaries": [] }, "selected": { "eraWidth": 940, "periodWidth": 0, "epochWidth": 0, "eonWidth": 940 } }
        setupPositions(
            positions,
            ts2,
            {
                from: "era",
                current: "period",
                to: "epoch"
            },
            null
        )
        console.log(positions)
        console.log(JSON.stringify(positions))
    })
})
