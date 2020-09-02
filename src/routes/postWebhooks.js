module.exports = async (fastify, options, next) => {
    fastify.post('/', options, async (req, reply) => {
        let data = req.body
        if (!Array.isArray(data)) data = [data]
        for (const message of data) {
            console.log(data)
        }
        if (!reply.sent) return { webserver: 'happy' }
    })
    next()
}