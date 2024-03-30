import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Follower extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare follower: number

  @column()
  declare followed: number
}
