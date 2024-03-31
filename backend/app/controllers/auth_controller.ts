// import type { HttpContext } from '@adonisjs/core/http'

import {HttpContext} from "@adonisjs/core/http";
import User from "../models/user.js";

export default class AuthController {
  public async register({ request,response }: HttpContext) {
    console.log('register')
    // Récupérer les données du corps de la requête
    const { login, password, email } = request.only(['login', 'password', 'email'])

    await User.create({
      fullName: login,
      email,
      password,
      // Autres propriétés à initialiser si nécessaire
    })
  return response.status(201).json({ message: 'Utilisateur créé avec succès' })
  }

}
