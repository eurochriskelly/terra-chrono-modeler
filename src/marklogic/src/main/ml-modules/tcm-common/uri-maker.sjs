// Class for figuring out how URIs are formed
class UriMaker {
    setLayer({ type = '', user= '*', layer = '*', radius}) {
        this.type = type
        this.user = user
        this.layer = layer
        this.radius = radius
    }
    
    getMatchingUris() {}
    get uri() {
        return `/tcm/user/${this.user}/layer/${this.layer}/${this.radius}/${this.type}`
    }
}

module.exports = UriMaker