declareUpdate()

console.log('ooop')

var ARGS
if (ARGS) ARGS = JSON.parse(xdmp.base64Decode(ARGS))

console.log('I did it')

const { uri, body } = ARGS

xdmp.log(`Updating document ${uri}`)
xdmp.documentInsert(uri, body)
