var ARGS
if (ARGS) ARGS = JSON.parse(xdmp.base64Decode(ARGS))

const { username } = ARGS
const pattern = `/gegeodesy/user/*/epoch/*`
const data = cts.uriMatch(pattern)
    .toArray()
    .map(uri => ({
        uri: `${uri}`, contents: cts.doc(uri).toObject()
    }))
    .filter(x => !x.uri.includes('/backdrop/'))

let userEpochs = data.filter(d => d.uri.includes(`/gegeodesy/user/${username}/`))
if (!userEpochs.length) {
    userEpochs = data.filter(d => d.uri.includes(`/gegeodesy/user/default/`))
}

// make the list uniquenicenice
const result = {
    command: 'getEpochs',
    actions: [],
    data: userEpochs,
    args: ARGS,
    message: `Found [${userEpochs.length}] epochs for user [${username}]!`
}

result
