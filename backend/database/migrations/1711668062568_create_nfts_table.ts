import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'nfts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer("mint")
      table.string("link", 100)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
