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
                        { key: 'rs:radius', value: '1000' },
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
        {
            disabled: true,
            name: 'Request for full documents in response',
            request: {
                method: 'GET',
                header: [],
                auth,
                body: {},
                url: {
                    ...apiDetails,
                    query: [
                        { key: 'rs:radius', value: '1000' },
                        { key: 'rs:mode', value: 'full' },
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
                            '    pm.expect(jsonData[0].type).to.be.equal("Feature");',
                            '});',
                        ],
                        type: 'text/javascript',
                    },
                },
            ],
        },
        {
            disabled: true,
            name: 'Request for a radius where we have no data',
            request: {
                method: 'GET',
                header: [],
                auth,
                body: {},
                url: {
                    ...apiDetails,
                    query: [
                        { key: 'rs:radius', value: '6000' },
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
                            '    pm.expect(jsonData).to.have.length(0);',
                            '});',
                        ],
                        type: 'text/javascript',
                    },
                },
            ],
        },

    ])
}
