const config = require('config')
const Knex = require('knex')
const path = require('path')
const fastify = require('fastify')()
const fs = require('fs')
const util = require('util')
const Path = require('path')
const readDir = util.promisify(fs.readdir)
const migrator = require('./lib/db/init')
const Sensors = require('./sensors')

const db = Knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, './lib/db/database.sqlite'),
    },
})

async function* readDirRecursive(path) {
    const entries = await readDir(path, { withFileTypes: true });
    for(let entry of entries) {
        const fullPath = Path.join(path, entry.name);
        if(entry.isDirectory()) {
            yield* readDirRecursive(fullPath);
        } else {
            yield fullPath;
        }
    }
}

async function run(){
    await migrator()
    fastify.decorate('config', config)
    fastify.decorate('db', db)
    const pathName = Path.resolve(__dirname, 'routes')
    for await(const route of readDirRecursive(pathName)) {
        fastify.register(require(route))
    }
    await fastify.listen(config.server.port, config.server.host)
    console.log(`Service started on ${fastify.server.address().address}:${fastify.server.address().port}`)
}

run()
Sensors(db)
setInterval(Sensors(db), 600000) // Take a picture and reading every 10 minutes

