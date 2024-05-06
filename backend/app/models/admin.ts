import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class Admin extends compose(BaseModel, AuthFinder) {
  verifyPassword: any

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare password: string

  @column()
  public isAdmin: boolean = false

  //@BelongsTo(() => Admin)
  //declare admin: BelongsTo<typeof Admin> | null

  public isAdministrator(): boolean {
    return this.isAdmin
  }
  
}
