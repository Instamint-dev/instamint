//import { middleware } from '#start/kernel'
import type { HttpContext } from '@adonisjs/core/http'
//import type { NextFn } from '@adonisjs/core/types/http'



export default class AdminMiddleware {
  public async handle ({ auth, response }: HttpContext, next: () => Promise<void>) {
    try {
      await auth.check()
    } catch (error) {
      return response.status(401).send({ message: 'Vous devez vous connecter en tant qu\'administrateur' })
    }

    const user = auth.user
    if (!user || !user.isAdmin) {
      return response.status(403).send({ message: 'Accès refusé. Vous devez être administrateur pour accéder à cette ressource.' })
    }

    await next()
  }
}
