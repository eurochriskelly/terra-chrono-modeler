var ARGS

const listLayers = () => {
    let uris = cts.uriMatch(`/gegeodesy/*/layer/*.json`).toArray()
        .map(uri => {
            return `${uri}`.split('/layer/').pop().split('/').shift()
        })
    // make the list unique
    uris = [...new Set(uris)]
    return {
        data: uris,
        message: `Found ${uris.length} layer(s)!`
    };
};

listLayers()
