var ARGS
if (ARGS) ARGS = JSON.parse(xdmp.base64Decode(ARGS))

const { username } = ARGS
const pattern = `/gegeodesy/user/*/current-state.json`
const data = cts.uriMatch(pattern)
    .toArray()
    .map(uri => ({
        uri: `${uri}`,
        contents: cts.doc(uri).toObject()
    }))

let userState = data.filter(d => d.uri.includes(`/gegeodesy/user/${username}/`)).shift()
if (!userState) {
    userState = data.filter(d => d.uri.includes(`/gegeodesy/user/default/`)).shift()
}

// make the list unique
const result = {
    id: 'user-state',
    command: 'getState',
    actions: [],
    data: userState,
    args: ARGS,
    message: `Found user state in uri [${userState.uri}]!`
}

result
