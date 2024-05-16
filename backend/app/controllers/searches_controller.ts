import type { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'
import User from '#models/user'
import search_type from '#controllers/type/search_type'
export default class SearchesController {
  protected async search({ request, response }: HttpContext) {
    const { search, nft, user, price, minPrice, maxPrice, place } = request.only([
      'search',
      'nft',
      'user',
      'price',
      'minPrice',
      'maxPrice',
      'place',
    ])
    let results: search_type[] = []
    if (nft) {
      let nftResults = await Nft.query()
        .select('nfts.id', 'nfts.link', 'nfts.image', 'nfts.place', 'nfts.price')
        .innerJoin('have_nfts', 'nfts.id', 'have_nfts.id_nft')
        .innerJoin('users', 'have_nfts.id_minter', 'users.id')
        .where('username', 'LIKE', `%${search}%`)
        .orWhere('description', 'LIKE', `%${search}%`)
        .orWhere('hashtags', 'LIKE', `%${search}%`)
        .andWhere('draft', '=', 0)

      if (price) {
        nftResults = nftResults.filter((nftResult) => {
          return nftResult.price >= minPrice && nftResult.price <= maxPrice
        })
      }
      const RETURN_NFT =
        nftResults.length > 0
          ? nftResults.map((nftResult) => {
              return {
                id: nftResult.id,
                link: '/nft/searchNFT/' + nftResult.link,
                image: nftResult.image,
                place: nftResult.place,
                type: 'nft',
                username: null,
              }
            })
          : []
      results.push(...RETURN_NFT)
    }
    if (user) {
      let userResults = await User.query()
        .where('username', 'LIKE', `%${search}%`)
        .andWhere('search_status', '=', 1)
      const RETURN_USER = userResults.map((userResult) => {
        return {
          id: userResult.id,
          link: '/user/' + userResult.link,
          image: userResult.image,
          place: userResult.place,
          type: 'minter',
          username: userResult.username,
        }
      })
      results.push(...RETURN_USER)
    }
    if (place !== null) {
      results = results.filter((result) => {
        if (result.place === place) {
          return result
        }
      })
    }
    return response.status(200).json({ results })
  }
  protected async getDefaultData({ response, request }: HttpContext) {
    const { user, nft } = request.only(['user', 'nft'])
    const getAllNft = await Nft.all()
    const maxPrice: number = getAllNft.reduce((acc, element) => Math.max(acc, element.price), 0)
    const PLACE_NFT: string[] = getAllNft
      .map((element) => element.place)
      .filter((place, index, self) => self.indexOf(place) === index)
    const getAllUser = await User.all()
    const PLACE_USER: string[] = getAllUser
      .map((element) => element.place)
      .filter((place, index, self) => self.indexOf(place) === index)
    return response.status(200).json({
      maxPrice: maxPrice,
      PLACE_NFT: nft ? PLACE_NFT : [],
      PLACE_USER: user ? PLACE_USER : [],
    })
  }
}
