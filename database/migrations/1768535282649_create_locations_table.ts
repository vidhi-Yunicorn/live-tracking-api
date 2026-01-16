
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trip_locations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('trip_id')
        .unsigned()
        .references('id')
        .inTable('trips')
        .onDelete('CASCADE')
        .notNullable()
        .unique() 
        
      table.string('lat').notNullable()
      table.string('lng').notNullable()

      table.timestamp('updated_at').notNullable()
      table.timestamp('created_at').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
