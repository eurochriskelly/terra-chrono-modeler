import { wrapCollection } from '../../../lib/helper.js'

export default (apiDetails, auth) => {
    return wrapCollection([
        {
            name: 'Create new features',
            request: {
                method: 'PUT',
                header: [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                auth,
                body: {
                    mode: 'raw',
                    raw: {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [-20, -42],  // Point 1
                                    [61, 0],     // Point 3
                                    [-21, -39],  // Point 10
                                    [-21, -42]   // Point 11 (Closing Point)
                                ]
                            ]
                        },
                        "properties": {
                            "name": "Polygon Surrounding Africa 2 - modified",
                        }
                    }
                },
                url: {
                    ...apiDetails,
                    query: [
                        { key: 'rs:id', value: ARGS.SAMPLE_ID },
                        { key: 'rs:radius', value: '1000' },
                        { key: 'rs:layer', value: 'continent2' },
                    ],
                }
            },
            response: [],
        },
    ])
}
