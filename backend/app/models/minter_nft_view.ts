import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Nft from '#models/nft'

export default class MinterNftView extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare minterId: number

  @column()
  declare nftId: number

  @column()
  declare viewCount: number

  @column()
  declare date_view: Date

  @hasMany(()=> User)
  declare user: HasMany<typeof User>

  @hasMany(()=> Nft)
  declare nft: HasMany<typeof Nft>

}
