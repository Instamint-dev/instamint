import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username:string

  @column()
  declare password:string
}