import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reset_passwords'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('token', 255).notNullable()
      table.integer('id_minter').unsigned().references('users.id').onDelete('CASCADE')
      table.date('create_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
