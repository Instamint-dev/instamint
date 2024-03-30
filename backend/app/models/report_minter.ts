import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ReportMinter extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_minter_report: number

  @column()
  declare id_minter_reporter: number
}
