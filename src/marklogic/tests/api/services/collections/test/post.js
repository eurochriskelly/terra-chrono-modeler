import { wrapCollection } from '../../../lib/helper.js'

export default (apiDetails, auth) => {
    return wrapCollection([
        {
            name: 'Create new collection',
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
                        'c4d11a3d0ef50d322ae1b4d402453e3d',
                        'ec7a6a558c4a0d9316b977b87ee09924',
                    ]
                },
                url: {
                    ...apiDetails,
                    query: [
                        { key: 'rs:radius', value: '1000' },
                        { key: 'rs:name', value: 'Sub-Saharan Africa' },
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
