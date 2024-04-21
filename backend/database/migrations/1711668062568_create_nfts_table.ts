import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'nfts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('mint')
      table.string('link', 100)
      table.string('description', 255)
      table.string('image', 255)
      table.string('hashtags', 255)
      table.string('place', 255)
      table.boolean('draft').defaultTo(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
