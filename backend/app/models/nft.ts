import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Commentary from '#models/commentary'

export default class Nft extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare mint: number

  @column()
  declare link: string

  @manyToMany(() => User, {
    pivotTable: 'have_nfts',
    pivotForeignKey: 'id_minter',
    pivotRelatedForeignKey: 'id_nft',
  })
  declare user: ManyToMany<typeof User>

  @belongsTo(() => Commentary)
  declare commentary: BelongsTo<typeof Commentary>
}
