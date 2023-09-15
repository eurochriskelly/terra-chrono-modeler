const REQ = type => mthd => require(`/ext/dgrm-api/methods/${type}/${mthd}.sjs`)
module.exports = m => ({
    GET: REQ(m)('get'),
    POST: REQ(m)('post'),
    PUT: REQ(m)('put'),
    DELETE: REQ(m)('delete'),
})
