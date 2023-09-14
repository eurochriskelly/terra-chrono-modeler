const { getCommonUris } = require('/ext/dgrm-api/lib/common.sjs')

// GET function
module.exports = (
  context,
  params
) => {
  const matchingUris = getCommonUris(context, params)
  return matchingUris.toArray().map(uri => {
    if (mode === 'ids') {
        return `${uri}`.split('/').pop().replace('.json', '')
    } else {
        return cts.doc(uri).toObject()
    }
  })
}
