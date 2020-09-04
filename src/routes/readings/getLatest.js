const fs = require('fs')
const path = require('path')
module.exports = async (fastify, options, next) => {
    fastify.get('/readings/latest', options, async (req, reply) => {

		const result = await fastify.db('measurements').select().limit(1).orderBy('id', 'desc')
		console.log(result)
		console.log(result[0])
		return result[0] ? result[0] : result
        
    })
    next()
}