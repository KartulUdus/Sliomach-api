module.exports = async (fastify, options, next) => {
    fastify.post('/settings/login', options, async (req, reply) => {
        console.log(req.body)
        if (req.body.password === fastify.config.settings.password) {
            console.log('success')
            req.session.authUser = { username: 'admin' }
            return { username: 'admin' }
        }
        reply.status(401)
        console.log('not success')

        return { message: 'Bad credentials' }
    })
    next()
}