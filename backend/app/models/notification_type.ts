import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Notification from '#models/notification'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class NotificationType extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare type: string

  @hasMany(() => Notification)
  declare notifications: HasMany<typeof Notification>
}
