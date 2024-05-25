import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RequestsPurchaseNft extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nft_id: number

  @column()
  declare buyer_id: number

  @column()
  declare seller_id: number

  @column()
  declare price: number

  @column()
  declare is_approved: number
}
