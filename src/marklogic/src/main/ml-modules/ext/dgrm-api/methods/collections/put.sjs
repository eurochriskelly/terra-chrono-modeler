const { II } = require('/ext/tcm-common/log.sjs')
const UriMaker = require('/ext/tcm-common/uri-maker.sjs')
const { processInstructions } = require('/ext/dgrm-api/lib/collections.sjs')

/**
 * Description:
 * - When creating a new collection, it may be created with or without
 *   child links
 * - The children are the ids of features that are part of the collection
 * - If children were not defined for the same radius, reject them but
 *   store the rejection information in the properties of the collection
 */
module.exports = (context, params, input) => {
    II('PUT:collections', params, `${input}`.length)
    const { id, radius, name,  user = 'default' } = params
    const uri = `/tcm/collection/${id}.json`

    // return zero or more document nodes
    const rejected = []
    const instructions = processInstructions(input, rejected, radius, context)
    const list = {}
    instructions
        .filter(i => i.$op === 'add')
        .forEach(i => list[i.uri] = true)
    instructions
        .filter(i => i.$op === 'remove')
        .forEach(i => list[i.uri] = false)

    const content = {
        type: 'FeatureCollection',
        properties: {
            ...params,
        },
        // TODO: Allow query params instead of a list of ids
        //       as alternative way of selecting features
        features: Object.entries(list).filter(([_, v]) => v).map(([k, _]) => k)
    }

    content.properties.created = new Date().toISOString()
    if (rejected.length) {
        content.properties.rejected = rejected
    }
    xdmp.invokeFunction(() => xdmp.documentInsert(uri, content, {
        permissions: xdmp.defaultPermissions(),
        collections: xdmp.documentGetCollections(uri),
    }), {
        transactionMode: 'update-auto-commit',
	isolation: 'different-transaction',
    })

    context.outputStatus = [201, 'Created']
    return []
}
