import type { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'
import User from '#models/user'
import search_type from '#controllers/type/search_type'
import db from "@adonisjs/lucid/services/db";
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
      let userResults = await User.query().where('username', 'LIKE', `%${search}%`)
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
      let userPhoneResults = await User.query()
        .where('phone', 'LIKE', `%${search}%`)
        .andWhere('search_status', '=', 1)
      const RETURN_USER_PHONE = userPhoneResults.map((userResult) => {
        return {
          id: userResult.id,
          link: '/user/' + userResult.link,
          image: userResult.image,
          place: userResult.place,
          type: 'minter',
          username: userResult.username,
        }
      })
      results.push(...RETURN_USER_PHONE)
      let userEmailResults = await User.query()
        .where('email', 'LIKE', `%${search}%`)
        .andWhere('search_status', '=', 1)
      const RETURN_USER_EMAIL = userEmailResults.map((userResult) => {
        return {
          id: userResult.id,
          link: '/user/' + userResult.link,
          image: userResult.image,
          place: userResult.place,
          type: 'minter',
          username: userResult.username,
        }
      })
      results.push(...RETURN_USER_EMAIL)
      results = results.filter(
        (result, index, self) =>
          self.findIndex((t) => t.id === result.id && t.type === result.type) === index
      )
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

  protected async searchUserMessage(ctx: HttpContext) {
    const { search } = ctx.request.only(['search'])

    const user = await ctx.auth.use('api').user
    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    if (search === null|| search === '') {
      const userFollow = await db.from('followers')
        .innerJoin('users', 'followers.follower', 'users.id')
        .where('followers.followed', user.id) // L'utilisateur connecté suit l'utilisateur trouvé
        .select('users.id', 'users.image', 'users.username');

      return ctx.response.status(200).json({ userFollow })
    }
    const userResults = await db.from('users')
      .join('followers', 'users.id', '=', 'followers.follower')
      .where('followers.followed', user.id)
      .where('users.username', 'LIKE', `%${search}%`)
      .select('users.id', 'users.link', 'users.image', 'users.place', 'users.username');
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
    console.log(RETURN_USER)
    return ctx.response.status(200).json({ userFollow: RETURN_USER })
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
