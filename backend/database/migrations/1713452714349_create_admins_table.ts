import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'admins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('username',).notNullable().unique()
      table.string('password', 255).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}