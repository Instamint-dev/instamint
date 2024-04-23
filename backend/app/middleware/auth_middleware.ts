import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/'

  async handle(ctx: HttpContext, next: NextFn) {
    console.log(ctx.request.all())

    const { username } = ctx.request.only(['username'])
    const { id } = ctx.request.only(['id'])
    if (username || id) {
      return next()
    } else {
      return ctx.response.status(404)
    }
  }
}
