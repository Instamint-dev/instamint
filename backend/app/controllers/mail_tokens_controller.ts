import type { HttpContext } from '@adonisjs/core/http'
import { randomBytes } from 'node:crypto'
import mail from '@adonisjs/mail/services/main'
import User from '#models/user'
import MailToken from '#models/mail_token'
import { DateTime } from 'luxon'
import env from '#start/env'

export default class MailTokensController {
  private generateToken(): string {
    const tokenLength = 255
    let token = ''
    while (token.length < tokenLength) {
      const buffer = randomBytes(tokenLength - token.length)
      const potentialToken = buffer.toString('base64').replace(/[^a-zA-Z0-9]/g, '')
      token += potentialToken.slice(0, tokenLength - token.length)
    }
    return token
  }

  protected async forgotPassword({ request, response }: HttpContext) {
    const { email } = request.only(['email'])
    const USER_VERIFY = await User.findBy('email', email)
    if (!USER_VERIFY) {
      return response.status(200).json({ message: false })
    }
    const token = this.generateToken()
    MailToken.create({
      token: token,
      id_minter: USER_VERIFY.id,
      create_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
    })
    const frontUrl = env.get('VITE_FRONTEND_URL')
    const link = frontUrl + '/generate-password/' + token.toString()
    await mail.send((message) => {
      message
        .to(email)
        .htmlView('emails/forgotPassword', { token: link })
        .subject('Forgot password')
    })
    return response.status(200).json({ message: true })
  }
  protected async checkTokenValid({ request, response }: HttpContext) {
    const { token } = request.only(['token'])
    const TOKEN_VERIFY = await MailToken.findBy('token', token)

    if (!TOKEN_VERIFY) {
      return response.status(200).json({ status: false, message: 'Token not found' })
    }

    const DATE_DIF = await MailToken.query()
      .select('create_at')
      .where('create_at', '>', DateTime.now().minus({ minute: 10 }).toFormat('yyyy-MM-dd HH:mm:ss'))
      .where('token', token)
    if (DATE_DIF.length === 0) {
      return response.status(200).json({ status: false, message: 'Token expired' })
    }

    return response.status(200).json({ status: true, message: 'Token valid' })
  }

  protected async generatePassword({ request, response }: HttpContext) {
    const { TOKEN_PASSWORD } = request.only(['TOKEN_PASSWORD'])
    const TOKEN_VERIFY = await MailToken.findBy('token', TOKEN_PASSWORD.token)
    if (!TOKEN_VERIFY) {
      return response.status(200).json({ message: 'Invalid token' })
    }
    const USER_VERIFY = await User.findBy('id', TOKEN_VERIFY.id_minter)
    if (!USER_VERIFY) {
      return response.status(200).json({ message: 'User not found' })
    }
    TOKEN_VERIFY.delete()
    USER_VERIFY.password = TOKEN_PASSWORD.password
    await USER_VERIFY.save()
    return response.status(200).json({ message: true })
  }

  protected async mailRegister({ request, response }: HttpContext) {
    const { email } = request.only(['email'])
    const USER_VERIFY = await User.findBy('email', email)
    if (USER_VERIFY) {
      return response.status(200).json({ message: false })
    }
    const token = this.generateToken()
    MailToken.create({
      token: token,
      mail: email,
      create_at: DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'),
    })
    const frontUrl = env.get('VITE_FRONTEND_URL')
    const link = frontUrl + '/register_token/' + token.toString()
    await mail.send((message) => {
      message.to(email).htmlView('emails/mailRegister', { token: link }).subject('Register')
    })
    return response.status(200).json({ message: true })
  }

  protected async checkUserExist({ request, response }: HttpContext) {
    const { username } = request.only(['username'])
    const USER_VERIFY = await User.findBy('username', username)
    if (USER_VERIFY) {
      return response.status(200).json({ message: false })
    }
    return response.status(200).json({ message: true })
  }
  protected async checkEmailExist({ request, response }: HttpContext) {
    const { email } = request.only(['email'])
    const USER_VERIFY = await User.findBy('email', email)
    if (USER_VERIFY) {
      return response.status(200).json({ message: false })
    }
    return response.status(200).json({ message: true })
  }
}
