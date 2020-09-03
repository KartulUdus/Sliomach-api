const Knex = require('knex')
const config = require('config')
const path = require('path')

module.exports = async (knex) => {
    await knex.migrate.latest({
        directory: path.join(__dirname, './migrations'),
        tableName: 'migrations',
    })
}