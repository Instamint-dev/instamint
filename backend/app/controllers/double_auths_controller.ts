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
  public async checkDoubleAuth({ request, auth, response }: HttpContext) {
    const { code, recoveryCode } = request.only(["code", "recoveryCode"])
    const user = auth.use('api').user
    if (user) {
      if (code) {
        const isValid = twoFactor.verifyToken(user.twoFactorSecret as string, code)
        if (isValid) {
          user.isTwoFactorEnabled = true
          await user.save()
          return response.status(200).json({ message: true })
        }
      } else if (recoveryCode) {
        const codes = user?.twoFactorRecoveryCodes ?? []
        if (codes.includes(recoveryCode)) {
          user.twoFactorRecoveryCodes = codes.filter((c) => c !== recoveryCode)
          await user.save()
          return response.status(200).json({ message: true })
        }
      }
    }
    return response.status(401).json({ message: 'Unauthorized' })
  }
  public async doubleAuthEnable({ auth, response }: HttpContext) {
    const user = auth.use('api').user
    if (user) {
      return response.status(200).json({ message: user.$extras.isTwoFactorEnabled })
    }
    return response.status(401).json({ message: 'Unauthorized' })
  }
}
