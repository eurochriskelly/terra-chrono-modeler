const { II } = require('/ext/tcm-common/log.sjs')
const UriMaker = require('/ext/tcm-common/uri-maker.sjs')

/**
 * Description:
 * - When creating a new collection, it may be created with or without child links
 * - The children are the ids of features that are part of the collection
 */
module.exports = (context, params, input) => {
    II('POST:collections', params, input.length)

    // return zero or more document nodes
    const content = {
        type: 'FeatureCollection',
        properties: {
            ...params,
        },
        features: input.toObject()
    }
    const { layer, radius, user = 'default' } = params
    // loop over input documents and insert them
    const featureIds = input.toObject().map(content => {
        const UM = new UriMaker({ type: 'collection', radius, layer, user })
        UM.content = content
        II(`Inserting document [${UM.uri}]`)
        content.properties.created = new Date().toISOString()
        xdmp.invokeFunction(() => xdmp.documentInsert(UM.uri, content, {
            permissions: xdmp.defaultPermissions(),
            collections: UM.collections,
        }), {
            transactionMode: 'update-auto-commit'
        })
        return UM.id
    })

    context.outputStatus = [201, 'Created']
    return featureIds
}
