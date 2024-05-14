import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 40).notNullable()
      table.string('email', 255).notNullable()
      table.string('password', 255).notNullable()
      table.string('image', 255).nullable()
      table.string('bio', 255).nullable()
      table.string('status').nullable()
      table.string('language').nullable()
      table.string('link', 255).nullable()
      table.string('search_status').nullable()
      table.string('two_factor_secret', 500).nullable()
      table.string('two_factor_recovery_codes', 500).nullable()
      table.boolean('is_two_factor_enabled').defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
