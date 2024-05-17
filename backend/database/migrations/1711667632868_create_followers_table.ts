import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'followers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('follower').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('followed').unsigned().references('users.id').onDelete('CASCADE')
      table.unique(['follower', 'followed'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
