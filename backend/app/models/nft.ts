import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Nft extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare mint: number

  @column()
  declare link: string

  @manyToMany(()=>User,{
    pivotTable: 'have_nfts',
    pivotForeignKey: 'id_minter',
    pivotRelatedForeignKey: 'id_nft'
  })
  declare user: ManyToMany<typeof User>
}
