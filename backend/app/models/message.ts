import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import User from '#models/user';
import type {  BelongsTo } from '@adonisjs/lucid/types/relations'


export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sender_id: number

  @column()
  declare receiver_id: number

  @column()
  declare content: string

  @column()
  declare send_date: string

  @belongsTo(() => User, { foreignKey: 'sender_id' })
  declare sender: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'receiver_id' })
  declare receiver: BelongsTo<typeof User>
}
