import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class DeletedUser extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_minter: number

  @column()
  declare deleted_at: Date

  @hasMany(() => User)
  declare user: HasMany<typeof User>

}
