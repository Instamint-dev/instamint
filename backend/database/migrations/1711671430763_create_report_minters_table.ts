import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'report_minters'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_minter_report').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('id_minter_reporter').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.unique(['id_minter_report', 'id_minter_reporter'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
