import { wrapCollection } from '../../../lib/helper.js'

export default (apiDetails, auth) => {
    return wrapCollection([
        {
            name: 'Create new features',
            request: {
                method: 'POST',
                header: [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                auth,
                body: {
                    mode: 'raw',
                    raw: [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [
                                    [
                                        [-20, -40],  // Point 1
                                        [60, -40],   // Point 2
                                        [60, 0],     // Point 3
                                        [40, 20],    // Point 4
                                        [30, 40],    // Point 5
                                        [0, 40],     // Point 6
                                        [-30, 30],   // Point 7
                                        [-40, 10],   // Point 8
                                        [-40, 0],    // Point 9
                                        [-20, -40]   // Point 10 (Closing Point)
                                    ]
                                ]
                            },
                            "properties": {
                                "name": "Polygon Surrounding Africa 2",
                            }
                        },
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [
                                    [
                                        [-20, -42],  // Point 1
                                        [61, 0],     // Point 3
                                        [32, 43],    // Point 5
                                        [0, 42],     // Point 6
                                        [-41, 9],   // Point 8
                                        [-11, 0],    // Point 9
                                        [-21, -39]   // Point 10 (Closing Point)
                                    ]
                                ]
                            },
                            "properties": {
                                "name": "Polygon Surrounding Africa 2",
                            }
                        }
                    ]
                },
                url: {
                    ...apiDetails,
                    query: [
                        { key: 'rs:radius', value: '1000' },
                        { key: 'rs:layer', value: 'continent' },
                    ],
                }
            },
            response: [],
            event: [
                {
                    listen: 'test',
                    script: {
                        exec: [
                            'pm.test("Status code is 201", function () {',
                            '    pm.response.to.have.status(201);',
                            '});',
                        ],
                        type: 'text/javascript',
                    },
                },
            ],
        },
    ])
}
