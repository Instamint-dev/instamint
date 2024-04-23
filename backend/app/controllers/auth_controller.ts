import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import MailToken from '#models/mail_token'
import AuthMiddleware from '#middleware/auth_middleware'
import cryptoRandomString from 'crypto-random-string'
import twoFactor from 'node-2fa'
import QRCode from 'qrcode'
export default class AuthController {
  private issuer = 'adonisjs-2fa'

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
    await User.create({
      username: username,
      email: TOKEN_VERIFY.mail,
      password: password,
      image: logo,
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
          const token = await User.accessTokens.create(USER_CONNECT)

          return ctx.response.json(token)
        }
      } else {
        const USER_CONNECT = await User.verifyCredentials(username, password)
        const token = await User.accessTokens.create(USER_CONNECT)

        await new AuthMiddleware().handle(ctx, async () => {})

        return ctx.response.json(token)
      }

      return ctx.response.status(401).json({ message: 'Invalid identifiers' })
    } catch (error) {
      return ctx.response.status(500).json({ message: 'Internal Server Error' })
    }
  }
  private async enableTwoFactorAuthentication({ auth }: HttpContext) {
    const user = auth.user
    if (user) {
      user.twoFactorSecret = this.generateSecret(user)
      user.twoFactorRecoveryCodes = await this.generateRecoveryCodes()
      await user.save()
    }
  }
  private generateSecret(user: User) {
    const secret = twoFactor.generateSecret({ name: this.issuer, account: user.email })
    return secret.secret
  }

  private async generateRecoveryCodes() {
    const recoveryCodeLimit: number = 8
    const codes: string[] = []
    for (let i = 0; i < recoveryCodeLimit; i++) {
      const recoveryCode: string = `${await this.secureRandomString()}-${await this.secureRandomString()}`
      codes.push(recoveryCode)
    }
    return codes
  }
  private async secureRandomString() {
    return cryptoRandomString({ length: 10, type: 'hex' })
  }
  private async generateQrCode(user: User) {
    const appName = encodeURIComponent(this.issuer)
    const userName = encodeURIComponent(user.email)
    const query = `?secret=${user.twoFactorSecret}&issuer=${appName}`
    const url = `otpauth://totp/${appName}${userName}${query}`
    const svg = await QRCode.toDataURL(url)
    return { svg, url }
  }
  
}
