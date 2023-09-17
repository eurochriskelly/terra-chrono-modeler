import { wrapCollection } from '../../../lib/helper.js'

export default (apiDetails, auth, args) => {
    return wrapCollection([
        {
            name: 'Clear data from the database',
            request: {
                method: 'DELETE',
                header: [],
                auth,
                body: {},
                url: {
                    ...apiDetails,
                    query: [
                        { key: 'rs:id', value: args.SAMPLE_ID },
                    ]
                }
            },
            response: [],
        },
    ])
}
