import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'nfts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('link', 100)
      table.string('description', 100)
      table.string('hashtags', 100)
      table.string('place', 100)
      table.boolean('draft')
      table.string('image', 100)
      table.integer('price')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
