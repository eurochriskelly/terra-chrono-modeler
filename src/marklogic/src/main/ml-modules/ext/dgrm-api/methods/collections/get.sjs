const { II } = require('/ext/tcm-common/log.sjs')
const UriMaker = require('/ext/tcm-common/uri-maker.sjs')

// GET function
module.exports = (
  context,
  params
) => {
  II('GET:collections', params)
  const { id } = params
  if (!id) {
    context.outputStatus = [400, 'No ID provided']
    return null
  }
  const UM = new UriMaker({ type: 'collection', id })
  const { uri } = UM
  const content = cts.doc(uri).toObject()
  return {
    ...content,
    features: content.features.map(uri => {
      return cts.doc(uri).toObject()
    })
  }
}
