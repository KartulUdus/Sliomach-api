const fs = require('fs')
const path = require('path')
module.exports = async (fastify, options, next) => {
    fastify.get('/timelapse/latest', options, async (req, reply) => {

		const imageFiles = fs.readdirSync(path.resolve(__dirname, '../../../timelapse/'))
		let latest = 0

		for (const imageFile of imageFiles) {
			if(imageFile.endsWith('.png') && +imageFile.replace('.png', '') && +imageFile.replace('.png', '') > latest) {
				latest = +imageFile.replace('.png', '')
			}
			
		}
		console.log(latest)
		const buffer = fs.readFileSync(path.resolve(__dirname, '../../../timelapse/', `${latest}.png`))
		reply.type('image/png') 
  		reply.send(buffer)
        
    })
    next()
}