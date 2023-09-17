import { wrapCollection } from '../../../lib/helper.js'

export default (apiDetails, auth) => {
    return wrapCollection([
        {
            name: 'Request for a radius where we have data',
            request: {
                method: 'GET',
                header: [],
                auth,
                body: {},
                url: {
                    ...apiDetails,
                    query: [
                        { key: 'rs:id', value: '2b69eee4904a2974c208cf11c290f540' },
                    ]
                },
            },
            response: [],
            event: [
                {
                    listen: 'test',
                    script: {
                        exec: [
                            'pm.test("Status code is 200", function () {',
                            '    pm.response.to.have.status(200);',
                            '});',
                            '',
                            'pm.test("Response has expected keys", function () {',
                            '    var jsonData = pm.response.json();',
                            '    pm.expect(jsonData).to.have.length(2);',
                            '});',
                        ],
                        type: 'text/javascript',
                    },
                },
            ],
        },
    ])
}
