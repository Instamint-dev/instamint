import type { HttpContext } from '@adonisjs/core/http'
import cryptoRandomString from 'crypto-random-string'
import twoFactor from 'node-2fa'
import QRCode from 'qrcode'
import User from '#models/user'

export default class DoubleAuthsController {
  private issuer = 'adonisjs-2fa'
  protected async enableTwoFactorAuthentication(ctx: HttpContext) {
    const user = ctx.auth.use('api').user
    if (user) {
      user.twoFactorSecret = this.generateSecret(user)
      user.twoFactorRecoveryCodes = await this.generateRecoveryCodes()
      await user.save()
      const qrCode = await this.generateQrCode(user)
      return ctx.response.status(200).json({ code: qrCode })
    }
    return ctx.response.status(401).json({ message: 'Unauthorized' })
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
  protected async checkDoubleAuth({ request, auth, response }: HttpContext) {
    const { code } = request.only(['code'])
    const user = auth.use('api').user
    if (user) {
      if (code) {
        const isValid = twoFactor.verifyToken(user.twoFactorSecret as string, code)
        if (isValid) {
          user.isTwoFactorEnabled = true
          await user.save()
          return response.status(200).json({ message: true })
        }
      }
    }
    return response.status(401).json({ message: 'Unauthorized' })
  }
  protected async doubleAuthEnable({ auth, response }: HttpContext) {
    const user = auth.use('api').user
    if (user) {
      return response.status(200).json({ message: user.isTwoFactorEnabled })
    }
    return response.status(401).json({ message: 'Unauthorized' })
  }
  protected async checkDoubleAuthLogin({ request, response, auth }: HttpContext) {
    const { code, username } = request.only(['code', 'username'])
    const isEmail = username.includes('@')
    if (isEmail) {
      const user = await User.findBy('email', username)
      if (user) {
        const isValid = twoFactor.verifyToken(user.twoFactorSecret as string, code)
        if (isValid) {
          const head = await auth.use('api').authenticateAsClient(user, [], { expiresIn: '1day' })
          return response.status(200).json({ message: head })
        }
      }
    } else {
      const user = await User.findBy('username', username)
      if (user) {
        const isValid = twoFactor.verifyToken(user.twoFactorSecret as string, code)
        if (isValid) {
          const head = await auth.use('api').authenticateAsClient(user, [], { expiresIn: '1day' })
          return response.status(200).json({ message: head })
        }
      }
    }
    return response.status(401).json({ message: 'Unauthorized' })
  }
  protected async disabledoubleAuth({ auth, response }: HttpContext) {
    const user = auth.use('api').user
    if (user) {
      user.isTwoFactorEnabled = false
      await user.save()
      return response.status(200).json({ message: true })
    }
    return response.status(401).json({ message: 'Unauthorized' })
  }
  protected async recoveryCode({ auth, response }: HttpContext) {
    const user = auth.use('api').user
    if (user) {
      return response.status(200).json(user.twoFactorRecoveryCodes)
    }
    return response.status(401).json({ message: 'Unauthorized' })
  }
  protected async checkRecoveryCode({ request, response, auth }: HttpContext) {
    const { recoveryCode, username } = request.only(['recoveryCode', 'username'])
    const user = await User.findBy('username', username)
    if (user) {
      const codes = user.twoFactorRecoveryCodes ?? []
      if (codes.includes(recoveryCode)) {
        user.twoFactorRecoveryCodes = codes.filter((c) => c !== recoveryCode)
        await user.save()
        const head = await auth.use('api').authenticateAsClient(user, [], { expiresIn: '1day' })
        return response.status(200).json({ message: head })
      }
    }
    return response.status(401).json({ message: 'Unauthorized' })
  }
}
