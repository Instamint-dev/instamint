import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import { Authenticators } from '@adonisjs/auth/types'
// @ts-ignore
import Cors from '@ioc:Adonis/Middleware/Cors'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    // Enable CORS for this request
    await Cors.handle(ctx.request.request, ctx.response.response)

    // Authenticate the request
    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })

    // Continue to the next middleware
    return next()
  }
}
