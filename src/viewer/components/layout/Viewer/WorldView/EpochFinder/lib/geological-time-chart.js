import _ from 'lodash';

export const periods = [
    {
        name: "Archean",
        start: 4000,
        end: 2500,
        color: '#ed2891',
    },
    {
        name: "Proterozoic",
        start: 2500,
        end: 541,
        color: '#f05978',
        children: [
            {
                name: "Paleoproterozoic",
                start: 2500,
                end: 1600,
                color: '#f16681',
                children: [
                    {
                        name: "Siderian",
                        start: 2500,
                        end: 2300,
                        color: '#f1708b'
                    },
                    {
                        name: "Rhyacian",
                        start: 2300,
                        end: 2050,
                        color: '#f27b96'
                    },
                    {
                        name: "Orosirian",
                        start: 2050,
                        end: 1800,
                        color: '#f386a0'
                    },
                    {
                        name: "Statherian",
                        start: 1800,
                        end: 1600,
                        color: '#f490ac'
                    },
                ]
            },
            {
                name: "Mesoproterozoic",
                start: 1600,
                end: 1000,
                color: '#fbbb7d',
                children: [
                    {
                        name: "Calymmian",
                        start: 1600,
                        end: 1400,
                        color: '#fcc691'
                    },
                    {
                        name: "Ectasian",
                        start: 1400,
                        end: 1200,
                        color: '#fcd09e'
                    },
                    {
                        name: "Stenian",
                        start: 1200,
                        end: 1000,
                        color: '#fbc46e'
                    },
                ]
            },
            {
                name: "Neoproterozoic",
                start: 1000,
                end: 541,
                color: '#fbb961',
                children: [
                    {
                        name: "Tonian",
                        start: 1000,
                        end: 720,
                        color: '#fbc46e'
                    },
                    {
                        name: "Cryogenian",
                        start: 720,
                        end: 635,
                        color: '#fcce7a'
                    },
                    {
                        name: "Ediacaran",
                        start: 635,
                        end: 541,
                        color: '#fcd88f'
                    }
                ],
            }
        ],
    },
    {
        name: "Phanerozoic",
        start: 541,
        end: 0,
        color: '#2979ff',
        children: [
            {
                name: "Paleozoic",
                start: 541,
                end: 251.902,
                color: '#9dc2a6',
                children: [
                    {
                        name: "Cambrian",
                        start: 541,
                        end: 485.4,
                        color: '#8aaa78',
                        children: [
                            {
                                name: "Terreneuvian",
                                start: 541,
                                end: 521,
                                color: '#94b58a',
                            },
                            {
                                name: "Epoch 2",
                                start: 521,
                                end: 509,
                                color: '#9ec194',
                            },
                            {
                                name: "Miaolingian",
                                start: 509,
                                end: 497,
                                color: '#aacea1',
                            },
                            {
                                name: "Furongian",
                                start: 497,
                                end: 485.4,
                                color: '#b4dbae',
                            },
                        ],
                    },
                    {
                        "name": "Ordovician",
                        "start": 485.4,
                        "end": 443.8,
                        "color": '#2aa78e',
                        "children": [
                            {
                                "name": "Early",
                                "start": 485.4,
                                "end": 470,
                                "color": '#2bad8e'
                            },
                            {
                                "name": "Middle",
                                "start": 470,
                                "end": 458.4,
                                "color": '#30bb9d'
                            },
                            {
                                "name": "Late",
                                "start": 458.4,
                                "end": 443.8,
                                "color": '#7dcaae'
                            }
                        ]
                    },
                    {
                        "name": "Silurian",
                        "start": 443.8,
                        "end": 419.2,
                        "color": '#b2ddca',
                        "children": [
                            {
                                "name": "Early Silurian",
                                "start": 443.8,
                                "end": 433.4,
                                "color": '#99b176'
                            },
                            {
                                "name": "Middle Silurian",
                                "start": 433.4,
                                "end": 427.4,
                                "color": '#a5bc87'
                            },
                            {
                                "name": "Late Silurian",
                                "start": 427.4,
                                "end": 419.2,
                                "color": '#b1c798'
                            }
                        ]
                    },
                    {
                        "name": "Devonian",
                        "start": 419.2,
                        "end": 358.9,
                        "color": '#ce9c5b',
                        "children": [
                            {
                                "name": "Early Devonian",
                                "start": 419.2,
                                "end": 393.3,
                                "color": '#e4b36d'
                            },
                            {
                                "name": "Middle Devonian",
                                "start": 393.3,
                                "end": 382.7,
                                "color": '#f2ca85'
                            },
                            {
                                "name": "Late Devonian",
                                "start": 382.7,
                                "end": 358.9,
                                "color": '#f2deaf'
                            }
                        ]
                    },
                    {
                        "name": "Carboniferous",
                        "start": 358.9,
                        "end": 298.9,
                        "color": '#68adb1',
                        "children": [
                            {
                                "name": "Early Carboniferous",
                                "start": 358.9,
                                "end": 323.2,
                                "color": '#729e85'
                            },
                            {
                                "name": "Late Carboniferous",
                                "start": 323.2,
                                "end": 298.9,
                                "color": '#99c3c7'
                            }
                        ]
                    },
                    {
                        "name": "Permian",
                        "start": 298.9,
                        "end": 251.902,
                        "color": '#e76549',
                        "children": [
                            {
                                "name": "Cisuralian",
                                "start": 298.9,
                                "end": 272.3,
                                "color": '#e97863'
                            },
                            {
                                "name": "Guadalupian",
                                "start": 272.3,
                                "end": 260.4,
                                "color": '#f58e76'
                            },
                            {
                                "name": "Lopingian",
                                "start": 260.4,
                                "end": 251.902,
                                "color": '#f9b4a2'
                            }
                        ]
                    }
                ],
            },
            {
                "name": "Mesozoic",
                "start": 251.902,
                "end": 66,
                "color": '#4cc6e0',
                "children": [
                    {
                        "name": "Triassic",
                        "start": 251.902,
                        "end": 201.3,
                        "color": '#8e52a1',
                        "children": [
                            {
                                "name": "Early",
                                "start": 251.902,
                                "end": 247.2,
                                "color": '#a764a7'
                            },
                            {
                                "name": "Middle",
                                "start": 247.2,
                                "end": 237,
                                "color": '#b776b1'
                            },
                            {
                                "name": "Late",
                                "start": 237,
                                "end": 201.3,
                                "color": '#bc9dc9'
                            }
                        ]
                    },
                    {
                        "name": "Jurassic",
                        "start": 201.3,
                        "end": 145,
                        "color": '#33b9e7',
                        "children": [
                            {
                                "name": "Early Jurassic",
                                "start": 201.3,
                                "end": 174.1,
                                "color": '#5bc1eb'
                            },
                            {
                                "name": "Middle Jurassic",
                                "start": 174.1,
                                "end": 163.5,
                                "color": '#82c9ef'
                            },
                            {
                                "name": "Late Jurassic",
                                "start": 163.5,
                                "end": 145,
                                "color": '#a8d2f2'
                            }
                        ]
                    },
                    {
                        "name": "Cretaceous",
                        "start": 145,
                        "end": 66,
                        "color": '#85c870',
                        "children": [
                            {
                                "name": "Early Cretaceous",
                                "start": 145,
                                "end": 100.5,
                                "color": '#97d081'
                            },
                            {
                                "name": "Late Cretaceous",
                                "start": 100.5,
                                "end": 66,
                                "color": '#a8d991'
                            }
                        ]
                    }
                ]
            },
            {
                "name": "Cenozoic",
                "start": 66,
                "end": 0,
                "color": '#f5eb08',
                "children": [
                    {
                        "name": "Paleogene",
                        "start": 66,
                        "end": 23.03,
                        "color": '#f9a86f',
                        "children": [
                            {
                                "name": "Paleocene",
                                "start": 66,
                                "end": 56,
                                "color": '#fab27a'
                            },
                            {
                                "name": "Eocene",
                                "start": 56,
                                "end": 33.9,
                                "color": '#fbbb85'
                            },
                            {
                                "name": "Oligocene",
                                "start": 33.9,
                                "end": 23.03,
                                "color": '#fddaab'
                            }
                        ]
                    },
                    {
                        "name": "Neogene",
                        "start": 23.03,
                        "end": 2.58,
                        "color": '#fcdc01',
                        "children": [
                            {
                                "name": "Miocene",
                                "start": 23.03,
                                "end": 5.333,
                                "color": '#fde133'
                            },
                            {
                                "name": "Pliocene",
                                "start": 5.333,
                                "end": 2.58,
                                "color": '#fde666'
                            }
                        ]
                    },
                    {
                        "name": "Quaternary",
                        "start": 2.58,
                        "end": 0,
                        "color": '#fef79a',
                        "children": [
                            {
                                "name": "Pleistocene",
                                "start": 2.58,
                                "end": 0.0117,
                                "color": '#fef9b3'
                            },
                            {
                                "name": "Holocene",
                                "start": 0.0117,
                                "end": 0,
                                "minWidth": 20,
                                "color": '#fefccd'
                            }
                        ]
                    }
                ]
            }

        ],
    },
]


export function getTimespan(list = periods, path) {
    // If no path is provided or it's empty, return null
    if (!path || path.length === 0) {
        return null;
    }

    // If the path has only one name, find and return the period from the top level
    if (path.length === 1) {
        return _.find(list, { name: path[0] });
    }

    // Otherwise, find the top-level period using the first name in the path
    let period = _.find(list, { name: path[0] });

    // Iterate through the rest of the path, navigating through children
    for (let i = 1; i < path.length; i++) {
        if (!period || !period.children) {
            return null;
        }

        period = _.find(period.children, { name: path[i] });
    }

    // Return the found period (or child period)
    return period;
}
