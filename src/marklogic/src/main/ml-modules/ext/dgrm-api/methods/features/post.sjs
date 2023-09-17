const { II } = require('/ext/tcm-common/log.sjs')
const UriMaker = require('/ext/tcm-common/uri-maker.sjs')

// Insert features in the database
module.exports = (context, params, input) => {
  II('POST:features', params, input.length)
  // return zero or more document nodes
  let ids = []
  const type = 'feature'

  const { layer, radius, user = 'default' } = params
  // loop over input documents and insert them
  input.toObject().forEach(content => {
    content.properties = {
      ...content.properties,
      radius, layer, user,
    }
    const UM = new UriMaker({ type: 'feature', radius, layer, user })
    UM.content = content
    II(`Inserting document [${UM.uri}]`)
    content.properties.created = new Date().toISOString()
    ids.push(UM.id)
    xdmp.invokeFunction(() => xdmp.documentInsert(UM.uri, content, {
      permissions: xdmp.defaultPermissions(),
      collections: UM.collections,
    }), {
      transactionMode: 'update-auto-commit'
    })
  })

  context.outputStatus = [201, 'Created']
  return ids
}
