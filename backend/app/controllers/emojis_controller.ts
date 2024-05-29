import type { HttpContext } from '@adonisjs/core/http'
import Emoji from '#models/emoji'

export default class EmojisController {
  async getEmojis(ctx: HttpContext) {
    const emojis = await Emoji.all()

    return ctx.response.status(200).json(emojis)
  }
}
