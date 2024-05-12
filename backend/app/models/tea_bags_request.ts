import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class TeaBagsRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare minterFollowUp: number

  @column()
  declare minterFollowReceive: number

  @column()
  declare etat: boolean
}
