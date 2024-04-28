import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
export default class SocialsController {
  protected async getUser({ request, response }: HttpContext) {
    const {link} = request.only(['link'])
    const UserExit = await User.findBy('link', link)
    if (!UserExit) {
      return response.status(200).json({message: false, user: {}})
    }
    return response.status(200).json({mesage : true, user:{}} )
  }
}
