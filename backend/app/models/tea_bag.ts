import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class TeaBag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cook: string

  @column()
  declare white_list: string | null

  @column()
  declare black_list_date: Date | null

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'report_tea_bags',
    pivotForeignKey: 'id_tea_bag',
    pivotRelatedForeignKey: 'id_minter',
  })
  declare tea_bag_users: ManyToMany<typeof User>
}
