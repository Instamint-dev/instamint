import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { ManyToMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import NotificationSetting from '#models/notification_setting'
import MinterNftView from '#models/minter_nft_view'
import Nft from '#models/nft'
import ReportMinter from '#models/report_minter'
import ResetPassword from '#models/reset_password'
import DeletedUser from '#models/deleted_user'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare password: string

  @column()
  declare image: string | null

  @column()
  declare bio: string | null

  @column()
  declare status: boolean | null

  @column()
  declare searchStatus: boolean | null

  @column()
  declare link: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @manyToMany(() => User,{
    pivotTable: 'follow_requests',
    pivotForeignKey: 'minter_follow_up',
    pivotRelatedForeignKey: 'minter_follow_receive',
    pivotColumns: ['etat']
  })
  declare follow_requests: ManyToMany<typeof User>

  @manyToMany(() => User,{
    pivotTable: 'followers',
    pivotForeignKey: 'id_follower',
    pivotRelatedForeignKey: 'id_followed'
  })
  declare followers: ManyToMany<typeof User>

  @belongsTo(() => NotificationSetting)
  declare notificationSettings: BelongsTo<typeof NotificationSetting>

  @belongsTo(()=> MinterNftView)
  declare minterNftView: BelongsTo<typeof MinterNftView>

  @manyToMany(()=> Nft,{
    pivotTable: 'report_nfts',
    pivotForeignKey: 'id_user',
    pivotRelatedForeignKey: 'id_nft',
    pivotColumns: ['report']
  })
  declare report_nft: ManyToMany<typeof Nft>

  @manyToMany(()=> Nft,{
    pivotTable: 'have_nfts',
    pivotForeignKey: 'id_user',
    pivotRelatedForeignKey: 'id_nft',
  })
  declare have_nft: ManyToMany<typeof Nft>

  @manyToMany(()=> ReportMinter,{
    pivotTable: 'report_minters',
    pivotForeignKey: 'id_minter_report',
    pivotRelatedForeignKey: 'id_minter_reporter'
  })
  declare report_minter: ManyToMany<typeof ReportMinter>

  @belongsTo(()=> ResetPassword)
  declare resetPassword: BelongsTo<typeof ResetPassword>

  @belongsTo(()=> DeletedUser)
  declare deletedUser: BelongsTo<typeof DeletedUser>
}
