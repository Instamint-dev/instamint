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
      image: 'https://instamintkami.blob.core.windows.net/instamint/user.png',
    })
    await TOKEN_VERIFY.delete()
    return response.status(201).json({ message: true })
  }

  protected async connection({ request, response }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password'])
      const isEmail = username.includes('@')

      if (isEmail) {
        const userByEmail = await User.findBy('email', username)

        if (userByEmail && userByEmail.username) {
          const USER_CONNECT = await User.verifyCredentials(userByEmail.username, password)
          const token = await User.accessTokens.create(USER_CONNECT)

          return response.json(token)
        }
      } else {
        const USER_CONNECT = await User.verifyCredentials(username, password)
        const token = await User.accessTokens.create(USER_CONNECT)

        return response.json(token)
      }

      return response.status(401).json({ message: 'Identifiants invalides' })
    } catch (error) {
      return response.status(500).json({ message: 'Erreur interne du serveur' })
    }
  }
}
