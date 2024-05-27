import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class Admin extends compose(BaseModel, AuthFinder) {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare password: string
  
  static accessTokens = DbAccessTokensProvider.forModel(Admin)
}
