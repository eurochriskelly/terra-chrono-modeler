import { wrapCollection } from '../../../lib/helper.js'

export default (apiDetails, auth, args) => {
    return wrapCollection([
        {
            name: 'Create new collection',
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
                    // Pass ids of features to add or remove from collection
                    raw: [
                        // This should log an error because it doesn't exist
                        {
                            $op: 'add',
                            id: '11111111111111111111111111111111'
                        },
                        // This should be removed
                        {
                            $op: 'remove',
                            id: 'ec7a6a558c4a0d9316b977b87ee09924'
                        },
                        // This should have no effect
                        {
                            $op: 'add',
                            id: 'c4d11a3d0ef50d322ae1b4d402453e3d'
                        },
                    ]
                },
                url: {
                    ...apiDetails,
                    query: [
                        // The id of the collection to update
                        { key: 'rs:id', value: args.SAMPLE_ID },
                        // This should rename the property
                        { key: 'rs:name', value: 'Sub-Saharan Africa 2' },
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
