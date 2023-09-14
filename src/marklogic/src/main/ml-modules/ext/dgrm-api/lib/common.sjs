const UriMaker = require('/ext/tcm-common/uri-maker.sjs')

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
  const matchingUris = UM.getMatchingUris(limit, radius ? [
    cts.jsonPropertyValueQuery('radius', `${radius}`),
  ] : [])
  context.outputStatus = [200, 'OK']
  return matchingUris
}

module.exports = {
  getCommonUris
}