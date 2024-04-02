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
    return response.status(201).json({ message : 'Utilisateur créé avec succès' })
  }

    protected async login({ request, response }: HttpContext) {
      try {
        const { username, password } = request.only(['username', 'password']);
          const user_connect = await User.verifyCredentials(username, password)
          const token =await User.accessTokens.create(user_connect)


        return response.json(token);
      } catch (error) {
        return response.status(401).json({ message: 'Identifiants invalides' });
      }
    }
}
