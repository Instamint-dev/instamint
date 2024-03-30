import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'minter_nft_views'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_nft').unsigned().references('nfts.id').onDelete('CASCADE')
      table.integer('id_minter').unsigned().references('users.id').onDelete('CASCADE')
      table.unique(['id_nft', 'id_minter'])
      table.integer('views').defaultTo(0)
      table.date('date_view')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
