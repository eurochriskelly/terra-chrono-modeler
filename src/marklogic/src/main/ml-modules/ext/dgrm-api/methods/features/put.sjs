// Insert features in the database
const UriMaker = require('/ext/tcm-common/uri-maker.sjs')
const { II, DD, fmtLog } = require('/ext/tcm-common/log.sjs')

module.exports = (context, params, input) => {
  II('PU:features', params, input)
  // return zero or more document nodes
  const type = 'feature'

  const { id, layer, user = 'default' } = params
  // loop over input documents and insert them

  // some fault tolerance for id vs uri. both should work.
  const UM = new UriMaker({ layer, type })
  const uri = UM.uriFromId(id)

  if (!fn.docAvailable(uri)) {
    context.outputStatus = [404, 'Not Found']
    return null
  }

  // Update the document content
  const oldContent = cts.doc(uri).toObject()
  const content = input.toObject()
  content.properties = {
    ...content.properties,
    ...(oldContent.properties || {}),
    layer, user,
    modified: new Date().toISOString(),
  }

  const collections = Array.from(xdmp.documentGetCollections(uri)).map(x => `${x}`)
  try {
    xdmp.documentInsert(uri, content, {
      permissions: xdmp.defaultPermissions(),
      collections,
    })
  } catch (e) {
    if (e.message.includes('XDMP-DUPLURI')) {
      context.outputStatus = [409, 'Conflict']
      return null
    } else {
      throw e
    }
  }

  context.outputStatus = [200, 'Modified']
  return null
}
