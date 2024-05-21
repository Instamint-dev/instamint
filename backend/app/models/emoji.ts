import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Emoji extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare alias: string
}
