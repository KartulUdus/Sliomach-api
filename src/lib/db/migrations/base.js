const { log } = require('../../logger')

exports.up = async function migrationUp(knex) {
    await knex.schema.createTable('plants', (table) => {
        table.increments('id').primary().notNullable()
        table.string('strain').notNullable()
        table.dateTime('started').defaultTo(knex.fn.now()) 
        table.dateTime('harvested').defaultTo(null)
        table.dateTime('jarred').defaultTo(null)
    })

    await knex.schema.createTable('nutrients', (table) => {
        table.increments('id').primary().notNullable()
        table.string('name').notNullable()
        table.text('comment').notNullable()
    })

    await knex.schema.createTable('water', (table) => {
        table.increments('id').primary().notNullable()
        table.string('name').notNullable()
        table.text('comment').notNullable()
        table.float('ph').notNullable()
        table.float('ppm').notNullable()
        table.float('ec').notNullable()
        table.jsonb('added_nutrients')

    })

    await knex.schema.createTable('waterings', (table) => {
        table.increments('id').primary().notNullable()
        table.string('water_id').notNullable()
        table.foreign('water_id').references('water.id').onDelete('CASCADE')
        table.text('comment').notNullable()
        table.float('amount').defaultTo(0)
        table.dateTime('time').defaultTo(knex.fn.now())
    })

    await knex.schema.createTable('dry_feedings', (table) => {
        table.increments('id').primary().notNullable()
        table.string('nutrient_id').notNullable()
        table.foreign('nutrient_id').references('nutrients.id').onDelete('CASCADE')
        table.text('comment').notNullable()
        table.float('amount').defaultTo(0)
        table.dateTime('time').defaultTo(knex.fn.now())
    })

    await knex.schema.createTable('measurements', (table) => {
        table.increments('id').primary().notNullable()
        table.float('temp').defaultTo(0)
        table.float('humidity').defaultTo(0)
        table.string('image')
        table.dateTime('time').defaultTo(knex.fn.now())
    })

    await knex.schema.createTable('devices', (table) => {
        table.increments('id').primary().notNullable()
        table.string('type')
        table.integer('pin')
        table.boolean('always_on').defaultTo(false)
        table.timestamp('turn_on').defaultTo(knex.fn.now())
        table.timestamp('turn_off').defaultTo(knex.fn.now())
        table.dateTime('updated_at').defaultTo(knex.fn.now())
    })

    log.info('Base migration applied')
}

exports.down = async function migrationDown(knex) {
    await knex.schema.dropTable('plants')
    await knex.schema.dropTable('nutrients')
    await knex.schema.dropTable('water')
    await knex.schema.dropTable('waterings')
    await knex.schema.dropTable('dry_feedings')
    await knex.schema.dropTable('measurements')
    await knex.schema.dropTable('devices')
    log.info('Base migration removed')
}
