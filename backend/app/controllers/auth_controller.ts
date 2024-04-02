import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  protected async register({ request, response }: HttpContext) {
    console.log(request.only(['username', 'password', 'email']))

    const { username, password, email } = request.only(['username', 'password', 'email'])

    await User.create({
      username: username,
      email: email,
      password: password,
    })
    return response.status(201).json({ message : 'Utilisateur créé avec succès' })
  }

  protected async login({request}: HttpContext) {
    return true
  }
}
