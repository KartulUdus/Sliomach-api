
const sensorLib = require('node-dht-sensor')
const PiCamera = require('pi-camera');

module.exports = async function(db, log) {
	const timestampFilename = Math.floor(new Date().valueOf() / 1000)
	const myCamera = new PiCamera({
		mode: 'photo',
		output: `${ __dirname }/../timelapse/${ timestampFilename }.png`,
		width: 1080,
		height: 720,
	})
	try {
		const reading = sensorLib.read(11, 14)
		console.log(`Tent temperature: ${reading.temperature.toFixed(1)}C humidity: ${reading.humidity.toFixed(1)}`)
		await myCamera.snap()
		console.log('took picture', timestampFilename + '.png')
		await db('measurements').insert({
			temp: reading.temperature.toFixed(1),
			humidity: reading.humidity.toFixed(1),
			image: timestampFilename,
			time: new Date().toISOString
		})
	} catch (e) {
		console.log('bad stuff happened', e)
	}

}