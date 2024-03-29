import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'followers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_follower').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('id_followed').unsigned().references('users.id').onDelete('CASCADE')
      table.unique(['id_follower', 'id_followed'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
