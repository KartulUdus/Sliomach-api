const fs = require('fs')
const path = require('path')
module.exports = async (fastify, options, next) => {
    fastify.get('/timelapse/latest', options, async (req, reply) => {

		const imageFiles = fastify.readDirRecursive(path.resolve(__dirname, '../../../timelapse/'))
		console.log(imageFiles)
        
    })
    next()
}