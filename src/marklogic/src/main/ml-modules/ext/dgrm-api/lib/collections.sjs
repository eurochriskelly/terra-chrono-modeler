const UriMaker = require('/ext/tcm-common/uri-maker.sjs')

const processInstructions = (
    input,
    rejected,
    radius,
    context
) => {
    return Array.from(input.toObject())
        .map(feature => {
            if (typeof feature === 'string') {
                return {
                    $op: 'add',
                    id: feature
                }
            }
            return feature
        })
        .map(({ $op, id }) => {
		// 
            const UMF = new UriMaker({ type: 'feature', id: `${id}` })
            const { uri } = UMF
            return { $op, uri }
        })
        .filter(({ $op, uri }) => {
            if (fn.docAvailable(uri)) return true
            context.outputStatus = [404, 'Not Found']
            return false
        })
        .filter(({ uri }) => {
            // Soft rejection of features that do not match the radius
            const featureRadius = cts.doc(uri).toObject().properties.radius
            const match = featureRadius === radius
            if (!match) rejected.push({
                uri,
                reason: `Radius mismatch: ${radius} !== ${featureRadius}`
            })
            return match
        })

}

module.exports = {
    processInstructions
}
