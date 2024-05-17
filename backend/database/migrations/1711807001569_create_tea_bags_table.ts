import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tea_bags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.jsonb('cook').nullable()
      table.string('white_list', 255).nullable()
      table.date('black_list_date').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
