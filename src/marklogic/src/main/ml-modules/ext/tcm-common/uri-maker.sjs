const {
    andQuery, collectionQuery
} = cts

/**
 * Control how URI's are generated for a given content
 */
class UriMaker {
    constructor({ type = '', user = '*', layer = '*', radius }) {
        this.type = type
        this.user = user
        this.layer = layer
        this.radius = radius
    }
    
    // by setting the content, we can generated a deterministic uri
    set content(content) {
        this.id = xdmp.md5(JSON.stringify(content))
    }
    getMatchingUris(limit = 100, queries = []) {
        const query = cts.andQuery([
            collectionQuery(`/tcm/type/${this.type}`),
            ...queries
        ])
        return fn.subsequence(cts.uris('', null, query), 1, limit)
    }
    get uri() {
        let uri = `/tcm/${this.type}`
        if (this.id) uri += `/${this.id}.json`
        return uri
    }
    get collections() {
        return [
            `/tcm/geometry`,
            `/tcm/type/feature`,
        ]
    }
}

module.exports = UriMaker