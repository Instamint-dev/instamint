import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  protected async register({ request, response }: HttpContext) {
    const { username, password, email } = request.only(['username', 'password', 'email'])

    await User.create({
      username: username,
      email: email,
      password: password,
    })
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
