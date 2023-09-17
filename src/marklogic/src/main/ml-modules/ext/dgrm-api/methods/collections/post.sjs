const { processInstructions } = require('../../lib/collections.sjs')
const { II } = require('/ext/tcm-common/log.sjs')
const UriMaker = require('/ext/tcm-common/uri-maker.sjs')

/**
 * Description:
 * - When creating a new collection, it may be created with or without
 *   child links
 * - The children are the ids of features that are part of the collection
 * - If children were not defined for the same radius, reject them but
 *   store the rejection information in the properties of the collection
 */
module.exports = (context, params, input) => {
    II('POST:collections', params, input.length)
    const { radius, user = 'default' } = params
    const UM = new UriMaker({ type: 'collection', radius, user })
    // return zero or more document nodes
    const rejected = []
    const instruction = processInstructions(input, rejected, radius, context)
    const content = {
        type: 'FeatureCollection',
        properties: {
            ...params,
        },
        // TODO: Allow query params instead of a list of ids
        //       as alternative way of selecting features
        features:
    }

    UM.content = content
    content.properties.created = new Date().toISOString()
    if (rejected.length) {
        content.properties.rejected = rejected
    }
    xdmp.invokeFunction(() => xdmp.documentInsert(UM.uri, content, {
        permissions: xdmp.defaultPermissions(),
        collections: UM.collections,
    }), {
        transactionMode: 'update-auto-commit'
    })

    context.outputStatus = [201, 'Created']
    return []
}
