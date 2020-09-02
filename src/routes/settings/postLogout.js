module.exports = async (fastify, options, next) => {
    fastify.post('/settings/logout', options, async (req, reply) => {
        delete req.session.authUser
        return { ok: true }
    })
    next()
}