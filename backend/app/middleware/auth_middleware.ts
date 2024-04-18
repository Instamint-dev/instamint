import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/'

  async handle(ctx: HttpContext, next: NextFn) {
    const { username } = ctx.request.only(['username'])
    const user = await User.findBy('username', username)

    if (user) {
      return next()
    } else {
      return ctx.response.status(404)
    }
  }
}
