import type { HttpContext } from '@adonisjs/core/http'

export default class SearchesController {
  public async search({ request, response }: HttpContext) {
    const { search, nft, user, price } = request.only(['search', 'nft', 'user', 'price'])
    console.log(search, nft, user, price)
    
    return response.status(200).json({ message: 'Search done' })
  }
}
