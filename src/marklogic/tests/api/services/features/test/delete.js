import { wrapCollection } from '../../../lib/helper.js'

export default (apiDetails, auth) => {
    return wrapCollection([
        {
            name: 'Clear data from the database',
            request: {
                method: 'DELETE',
                header: [],
                auth,
                body: {},
                url: apiDetails,
            },
            response: [],
        },
    ])
}
