var ARGS
if (ARGS) ARGS = JSON.parse(xdmp.base64Decode(ARGS))

const { epoch, username } = ARGS
const pattern = `/gegeodesy/user/*/epoch/${epoch}/backdrop/*`
const data = cts.uriMatch(pattern)
    .toArray()
    .map(uri => ({
        uri: `${uri}`, contents: cts.doc(uri).toObject()
    }))

let userBackdrops = data.filter(d => d.uri.startsWith(`/gegeodesy/user/${username}/`))
if (!userBackdrops.length) {
    userBackdrops = data.filter(d => d.uri.startsWith(`/gegeodesy/user/default/`))
}

// make the list uniquenicenice
const result = {
    command: 'getBackdrops',
    actions: [],
    data: userBackdrops,
    args: ARGS,
    message: `Found [${userBackdrops.length}] epochs for user [${username}]!`
}

result
