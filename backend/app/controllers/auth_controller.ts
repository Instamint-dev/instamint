import {HttpContext} from "@adonisjs/core/http";
import User from "#models/user";

export default class AuthController {
  public async register({ request,response }: HttpContext) {

    const { login, password, email } = request.only(['login', 'password', 'email'])

    await User.create({
      username: login,
      email: email,
      password: password,
    })
  return response.status(201).json({ message: 'Utilisateur créé avec succès' })
  }
  public async login({ request }: HttpContext) {

    return true;
  }

}
