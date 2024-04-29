import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import Nft from '#models/nft'
export default class SocialsController {
  protected async getUser({ request, response }: HttpContext) {
    const {link} = request.only(['link'])
    const UserExit = await User.findBy('link', link)
    if (!UserExit) {
      return response.status(200).json({return: false, user: {}})
    }
    const followers = await UserExit.related('followers').query().select('id')

    const following = await db.from('followers').innerJoin('users','users.id','id_follower').where('id_followed', UserExit.id)
    const nftIds = await UserExit.related('have_nft').query().select('id')
    const listNft = await Nft.query().whereIn(
      'id',
      nftIds.map((nft) => nft.id)
    )
    const nfts = listNft.filter((nft) => {
      return nft.description && nft.image && nft.place && nft.hashtags && Number(nft.draft) === 0
    })
    let userInfo = {
      username :UserExit.username,
      photo:'',
      bio: '',
      lien: '',
    }
    if (UserExit.status === 'public') {
      userInfo = {
        username:UserExit.username,
        photo: UserExit.image,
        bio: UserExit.bio ? UserExit.bio : '',
        lien: UserExit.link ? UserExit.link : '',

      }
    }

    return response.status(200).json({return : true, user:{followers: followers.length, following: following.length, nfts: nfts, status:UserExit.status, userInfo:userInfo}} )
  }
}
