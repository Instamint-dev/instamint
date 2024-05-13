import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'admins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username')
      table.string('password', 255)
      table.boolean('is_admin').defaultTo(false) 
      table.string('role')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}