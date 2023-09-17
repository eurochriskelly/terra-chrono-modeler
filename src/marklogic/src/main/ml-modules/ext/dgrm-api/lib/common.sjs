const { jsonPropertyValueQuery } = cts
const UriMaker = require('/ext/tcm-common/uri-maker.sjs')

// Search for documents matching the provided parameters
const getCommonUris = (
  context,
  params
) => {
  const {
    layer,
    limit,
    radius,
    mode = 'ids',
  } = params
  if (['ids', 'full'].includes(mode) === false) {
    // Bad request
    context.outputStatus = [400, 'Bad Request']
    return []
  }
  const UM = new UriMaker({ layer, radius, type: 'feature' })
  const matchingUris = UM.getMatchingUris(limit, [
    radius && jsonPropertyValueQuery('radius', `${radius}`),
    layer && jsonPropertyValueQuery('later', `${layer}`),
  ].filter(x => x))
  context.outputStatus = [200, 'OK']
  return matchingUris
}

// Return the ID part of the URI or the complete object if full is requested
const idOrObject = (
  uri,
  mode
) => mode === 'ids'
    ? `${uri}`.split('/').pop().replace('.json', '')
    : cts.doc(uri).toObject()


module.exports = {
  getCommonUris,
  idOrObject,
}
