import type { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'
import User from '#models/user'
import search_type from '#controllers/type/search_type'
export default class SearchesController {
  protected async search({ request, response }: HttpContext) {
    const { search, nft, user, price, minPrice, maxPrice, place } = request.only(['search', 'nft', 'user', 'price', 'minPrice', 'maxPrice','place'])
    let results: (search_type)[] = []
    if (nft) {
      let nftResults = await Nft.query()
        .select('nfts.id', 'nfts.link', 'nfts.image', 'nfts.place', 'nfts.price')
        .innerJoin('have_nfts', 'nfts.id', 'have_nfts.id_nft')
        .innerJoin('users', 'have_nfts.id_minter', 'users.id')
        .where('username', 'LIKE', `%${search}%`)
        .orWhere('description', 'LIKE', `%${search}%`)
        .andWhere('draft', '=', 0)

      if (price) {
        nftResults = nftResults.filter((nft) => {
          return nft.price >= minPrice && nft.price <= maxPrice
        })
      }
      const return_nft = nftResults.length > 0 ? nftResults.map((nft) => {
        return {
          id: nft.id,
          link : nft.link,
          image: nft.image,
          place: nft.place,
          type: "nft"
        }
      }) : []
      results.push(...return_nft)
    }
    if (user) {
      let userResults = await User.query()
        .where('username', 'LIKE', `%${search}%`)
        .andWhere('search_status', '=', 1)
      const return_user = userResults.map((user) => {
        return {
          id: user.id,
          link : user.link,
          image: user.image,
          place: user.place,
          type: "user"
        }
      })
      results.push(...return_user)
    }
    if (place !== null) {
      results = results.filter((result) => {
        if (result.place === place) {
          return result
        }
      })
    }
    return response.status(200).json({ message: results })
  }
  protected async getDefaultData({ response, request }: HttpContext) {
    const { user, nft } = request.only(['user', 'nft'])
    const maxPrice:number = (await Nft.all()).reduce((acc, nft) => Math.max(acc, nft.price), 0)
    const place_nft:string[] = (await Nft.all()).map((nft) => nft.place).filter((place, index, self) => self.indexOf(place) === index)
    const place_user:string[] = (await User.all()).map((user) => user.place).filter((place, index, self) => self.indexOf(place) === index)
    return response.status(200).json({ maxPrice: maxPrice, place_nft: nft ? place_nft: [], place_user: user ? place_user: []})
  }

}
