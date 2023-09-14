const { getCommonUris } = require('/ext/dgrm-api/lib/common.sjs')

// GET function
module.exports = (
  context,
  params
) => {
  const matchingUris = getCommonUris(context, params)
  return matchingUris.toArray().map(uri => {
    xdmp.documentDelete(uri)
  })
}
