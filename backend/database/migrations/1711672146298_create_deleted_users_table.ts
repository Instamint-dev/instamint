import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'deleted_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_minter').unsigned().references('users.id').onDelete('CASCADE')
      table.date('deleted_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
