
import { Authenticators } from '@adonisjs/auth/types'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'


export default class AdminMiddleware {
  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {
      guards: ['api'],
    }
  ) {
    await ctx.auth.authenticateUsing(options.guards)
    

    await next()
  }
}
