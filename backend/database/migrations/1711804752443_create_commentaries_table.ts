import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'commentaries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_minter').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('id_nft').unsigned().references('nfts.id').onDelete('CASCADE')
      table.string('message', 300).notNullable()
      table.integer('id_parent_commentary').defaultTo(0)
      table.timestamp('date').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
