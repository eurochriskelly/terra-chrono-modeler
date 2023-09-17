const processInstructions = (
    input,
    rejected,
    radius,
    context,
) => {
    const instructions = input.toObject()
        .map(feature => {
            if (typeof feature === 'string') {
                return {
                    $op: 'add',
                    id: feature
                }
            }
            return feature
        })
        .map(inst => {
            const { $op, id } = inst
            const UMF = new UriMaker({ type: 'feature', id: `${id}` })
            const { uri } = UMF
            return { $op, uri }
        })
        .filter(({ uri }) => {
            const { $op, uri } = inst
            if (fn.docAvailable(uri)) {
                return true
            }
            context.outputStatus = [404, 'Not Found']
            return false
        })
        .filter(({ uri }) => {
            // Soft rejection of features that do not match the radius
            const match = cts.doc(uri).toObject().properties.radius === radius
            if (!match) rejected.push({
                uri,
                reason: `Radius mismatch: ${radius} !== ${cts.doc(uri).toObject().properties.radius}`
            })
            return match
        })
}

module.exports = {
    processInstructions
}
