import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import MailToken from '#models/mail_token'

export default class AuthController {
  protected async register({ request, response }: HttpContext) {
    const { username, password, token } = request.only(['username', 'password', 'token'])
    const TOKEN_VERIFY = await MailToken.findBy('token', token)
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
    })
    TOKEN_VERIFY.delete()
    return response.status(201).json({ message: true })
  }

  protected async connection({ request, response }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password'])
      const USER_CONNECT = await User.verifyCredentials(username, password)
      const token = await User.accessTokens.create(USER_CONNECT)

      return response.json(token)
    } catch (error) {
      return response.status(401).json({ message: 'Identifiants invalides' })
    }
  }
}
