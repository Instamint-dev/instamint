import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'requests_change_nfts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('nft_id', 254)
        .unsigned()
        .references('id')
        .inTable('nfts')
        .notNullable()
        .onDelete('CASCADE')
      table
        .integer('minter_requester_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('minter_received_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('nft_id_minter_would', 254)
        .unsigned()
        .references('id')
        .inTable('nfts')
        .onDelete('CASCADE')
        .notNullable()
      table.boolean('is_approved')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
