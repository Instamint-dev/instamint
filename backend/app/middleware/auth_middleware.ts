// app/Middleware/CorsMiddleware.ts

import cors from 'cors'
import {HttpContext} from "@adonisjs/core/http";

export default class CorsMiddleware {
  public async handle ({ response }: HttpContext, next: () => Promise<void>) {
    // Configure CORS options as needed
    const options = {
      origin: '*', // Autorise toutes les sources
      methods: 'GET,PUT,POST,DELETE', // Autorise ces méthodes HTTP
      allowedHeaders: 'Content-Type,Authorization', // Autorise ces en-têtes
    }

    // Utilisez le middleware CORS avec les options configurées
    cors(options)(response.request, response.response, () => {})

    // Poursuivre le flux de la requête
    await next()
  }
}
