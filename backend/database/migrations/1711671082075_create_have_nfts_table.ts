import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'have_nfts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_nft').unsigned().references('nfts.id').onDelete('CASCADE')
      table.integer('id_minter').unsigned().references('users.id').onDelete('CASCADE')
      table.unique(['id_nft', 'id_minter'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
