import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notification_settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_minter').unsigned().references('users.id').onDelete('CASCADE')
      table.boolean('commentary_answer').defaultTo(true)
      table.boolean('commentary_thread').defaultTo(true)
      table.boolean('mint').defaultTo(true)
      table.boolean('follow').defaultTo(true)
      table.boolean('follow_request').defaultTo(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
