const fs = require('fs')
const path = require('path')
module.exports = async (fastify, options, next) => {
    fastify.get('/readings/latest', options, async (req, reply) => {

		const result = fastify.db('measurements').select().limit(1).orderBy('id', 'desc')
		return { result }
        
    })
    next()
}