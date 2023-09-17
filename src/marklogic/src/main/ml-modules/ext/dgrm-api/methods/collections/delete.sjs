const UriMaker = require('/ext/tcm-common/uri-maker.sjs')
const { getCommonUris } = require('/ext/dgrm-api/lib/common.sjs')

// GET function
module.exports = (
    context,
    params
) => {
    const { id } = params
    if (!id) {
        context.outputStatus = [400, 'No ID provided']
        return null
    }
    const UM = new UriMaker({ type: 'collection', id })
    const { uri } = UM
    console.log(`Deleting feature collection with uri [${uri}]`)
    xdmp.documentDelete(uri)
}
