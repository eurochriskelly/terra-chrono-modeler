const UriMaker = require('/ext/tcm-common/uri-maker.sjs')
const { getCommonUris, idOrObject } = require('/ext/dgrm-api/lib/common.sjs')

// GET function
module.exports = (
  context,
  params
) => {
  const { id, mode } = params
  if (id) {
    // If an ID is provided, delete that document and return the ID
    const UM = new UriMaker({ type: 'feature' })
    const uri = UM.getUri(id)
    return idOrObject(uri, mode)
  } else {
    // If no ID is provided, find all matching documents and return their IDs
    const matchingUris = getCommonUris(context, params)
    return matchingUris.toArray().map(uri => idOrObject(uri, mode))
  }
}
