import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'report_tea_bags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_tea_bag').unsigned().references('tea_bags.id').onDelete('CASCADE')
      table.integer('id_minter').unsigned().references('users.id').onDelete('CASCADE')
      table.unique(['id_tea_bag', 'id_minter'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
