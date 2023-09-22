import { wrapCollection } from '../../../lib/helper.js'

export default (apiDetails, auth, args) => {
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
                        { key: 'rs:id', value: args.SAMPLE_ID },
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
                            '    pm.expect(jsonData.features).to.have.length(1);',
                            '    pm.expect(jsonData.properties.name).to.eql("Sub-Saharan Africa 2");',
                            '});',
                        ],
                        type: 'text/javascript',
                    },
                },
            ],
        },
    ])
}
