import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class MailToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare token: string

  @column()
  declare id_minter: number

  @column()
  declare create_at: string

  @column()
  declare mail: string

  @hasMany(() => User)
  declare user: HasMany<typeof User>
}
