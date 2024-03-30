import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Nft from '#models/nft'

export default class Commentary extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_minter: number

  @column()
  declare id_nft: number

  @column()
  declare message: string

  @column()
  declare id_parent_commentary: number

  @hasMany(() => User)
  declare user: HasMany<typeof User>

  @hasMany(() => Nft)
  declare nft: HasMany<typeof Nft>

  @manyToMany(() => User, {
    pivotTable: 'report_commentaries',
    pivotForeignKey: 'id_commentary',
    pivotRelatedForeignKey: 'id_minter',
  })
  declare report_commentaries: ManyToMany<typeof User>
}
