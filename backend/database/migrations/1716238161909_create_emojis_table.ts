import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'emojis'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('alias').notNullable()
      table.string('name').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
