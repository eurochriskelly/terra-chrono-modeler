var ARGS
if (ARGS) ARGS = JSON.parse(xdmp.base64Decode(ARGS))

// console.log('Running getLayer.sjs')

const layerName = (ARGS && ARGS.length) ? ARGS[0] : 'test'

const pattern = `/gegeodesy/*/layer/${layerName}/*.json`
const data = cts.uriMatch(pattern)
    .toArray()
    .map(uri => ({
        uri, data: cts.doc(uri).toObject()
    }))

// make the list unique
const result = {
    command: 'getLayers',
    actions: ['drawData'],
    data,
    args: ARGS,
    message: `Found ${data.length} uri(s) on layer [${layerName}]!`
}

result
