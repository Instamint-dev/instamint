import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'requests_purchase_nfts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('nft_id')
        .unsigned()
        .references('id')
        .inTable('nfts')
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('buyer_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('seller_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('price', 10).notNullable()
      table.integer('is_approved')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
