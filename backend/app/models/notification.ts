import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import NotificationSetting from '#models/notification_setting'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare type: number

  @column()
  declare message: string

  @column()
  declare link: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @hasMany(() => User)
  declare user: HasMany<typeof User>

  @belongsTo(() => NotificationSetting)
  declare notificationSettings: BelongsTo<typeof NotificationSetting>
}
