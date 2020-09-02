const Knex = require('knex')
const config = require('config')
const path = require('path')
const knex = Knex({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.join(__dirname, './database.sqlite'),
    },
})

module.exports = async () => {
    await knex.migrate.latest({
        directory: path.join(__dirname, './migrations'),
        tableName: 'migrations',
    })
}