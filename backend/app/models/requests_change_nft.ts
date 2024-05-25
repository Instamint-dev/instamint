import { BaseModel, column } from '@adonisjs/lucid/orm'
export default class RequestsChangeNft extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nft_id_minter_would: number

  @column()
  declare minter_requester_id: number

  @column()
  declare nft_id: number

  @column()
  declare minter_received_id: number

  @column()
  declare is_approved: boolean
}
