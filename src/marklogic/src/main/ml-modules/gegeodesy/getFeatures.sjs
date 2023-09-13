var ARGS
if (ARGS) ARGS = JSON.parse(xdmp.base64Decode(ARGS))

const { epoch, username } = ARGS
const epochs = epoch.split(',')
const pattern = `/gegeodesy/epoch/*/layer/*`
const data = cts.uriMatch(pattern)
    .toArray()
    .filter(uri =>
        epochs.some(epoch => `${uri}`.includes(`/epoch/${epoch}/`))
    )
    .map(uri => ({
        uri: `${uri}`,
        contents: cts.doc(uri).toObject()
    }))

// make the list unique
const result = {
    command: 'getFeatures',
    actions: [],
    data,
    args: ARGS,
    message: `Found [${data.length}] features for epochs [${epoch}]!`
}

result
