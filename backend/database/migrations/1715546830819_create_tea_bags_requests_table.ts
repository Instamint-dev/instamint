import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tea_bags_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('minter_follow_up').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('minter_follow_receive').unsigned().references('users.id').onDelete('CASCADE')
      table.unique(['minter_follow_up', 'minter_follow_receive'])
      table.boolean('etat').defaultTo(false)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
