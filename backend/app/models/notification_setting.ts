import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type {HasMany} from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class NotificationSetting extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_minter: number

  @column()
  declare commentary_answer: boolean

  @column()
  declare commentary_thread: boolean

  @column()
  declare mint: boolean

  @column()
  declare follow: boolean

  @column()
  declare follow_request: boolean

  @hasMany(() => User)
  declare user: HasMany<typeof User>

}
