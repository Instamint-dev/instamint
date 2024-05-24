import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import MailToken from '#models/mail_token'
import db from '@adonisjs/lucid/services/db'
import NotificationSetting from '#models/notification_setting'
import DeletedUser from '#models/deleted_user'
export default class AuthController {
  protected async register({ request, response }: HttpContext) {
    const { username, password, token } = request.only(['username', 'password', 'token'])
    const TOKEN_VERIFY = await MailToken.findBy('token', token)
    const logo = 'https://instamintkami.blob.core.windows.net/instamint/user.png'
    if (!TOKEN_VERIFY) {
      return response.status(200).json({ message: false })
    }
    const USER_VERIFY = await User.findBy('username', username)
    if (USER_VERIFY) {
      return response.status(200).json({ message: false })
    }
    const newUser = await User.create({
      username: username,
      email: TOKEN_VERIFY.mail,
      password: password,
      image: logo,
      status: 'public',
    })
    NotificationSetting.create({
      id_minter: newUser.id,
      follow: true,
      follow_request: true,
      commentary_answer: true,
      mint: true,
    })
    await TOKEN_VERIFY.delete()
    return response.status(201).json({ message: true })
  }

  protected async connection(ctx: HttpContext) {
    try {
      const { username, password } = ctx.request.only(['username', 'password'])
      const isEmail = username.includes('@')

      if (isEmail) {
        const userByEmail = await User.findBy('email', username)

        if (userByEmail && userByEmail.username) {
          const USER_CONNECT = await User.verifyCredentials(userByEmail.username, password)
          if (USER_CONNECT.isTwoFactorEnabled) {
            return ctx.response.json({ message: '2FA' })
          }
          const head = await ctx.auth
            .use('api')
            .authenticateAsClient(USER_CONNECT, [], { expiresIn: '1day' })
          return ctx.response.json({ message: head })
        }
      } else {
        const USER_CONNECT = await User.verifyCredentials(username, password)
        if (USER_CONNECT.isTwoFactorEnabled) {
          return ctx.response.json({ message: '2FA' })
        }
        const checkIsDeleted = await DeletedUser.findBy('id_minter', USER_CONNECT.id)
        if (checkIsDeleted !== null) {
          return ctx.response.status(401).json({ message: 'Invalid identifiers' })
        }
        const head = await ctx.auth
          .use('api')
          .authenticateAsClient(USER_CONNECT, [], { expiresIn: '1day' })
        return ctx.response.send({ message: head })
      }

      return ctx.response.status(401).json({ message: 'Invalid identifiers' })
    } catch (error) {
      return ctx.response.status(500).json({ message: 'Internal Server Error' })
    }
  }
  protected async logout(ctx: HttpContext) {
    const user = ctx.auth.use('api').user

    if (user) {
      db.from('auth_access_tokens').where('tokenable_id', user.id).delete().exec()
      return ctx.response.status(200).json({ message: true })
    }
    return ctx.response.status(401).json({ message: 'Unauthorized' })
  }
  protected async checkIsLogin(ctx: HttpContext) {
    const user = ctx.auth.use('api').user
    if (user) {
      const checkIsDeleted = await DeletedUser.findBy('id_minter', user.id)
      if (checkIsDeleted === null) {
        return ctx.response.status(200).json({ message: true })
      }
    }
    return ctx.response.status(200).json({ message: false })
  }
}
