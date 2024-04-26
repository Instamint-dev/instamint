//import { middleware } from '#start/kernel'
import type { HttpContext } from '@adonisjs/core/http'
//import type { NextFn } from '@adonisjs/core/types/http'



export default class AdminMiddleware {
   async handle ({ auth, response }: HttpContext, next: () => Promise<void>) {
    try {
      await auth.check()
    } catch (error) {
      return response.status(401).send({ message: 'You must log in as administrator' })
    }

    const user = auth.user
    if (!user || !user.isAdmin) {
      return response.status(403).send({ message: 'Access denied. You must be an administrator to access this ressource.' })
    }

    await next()
  }
}
