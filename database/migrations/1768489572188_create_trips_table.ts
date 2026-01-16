import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trips'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('driver_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')

      table
        .enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])
        .defaultTo('pending')

       table.decimal('distance', 10, 3).defaultTo(0)

      table.string('start_lat').notNullable()
      table.string('start_lng').notNullable()

      table.string('end_lat').notNullable()
      table.string('end_lng').notNullable()

      table.timestamp('started_at')
      table.timestamp('ended_at')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
