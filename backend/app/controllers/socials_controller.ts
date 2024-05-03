import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import Nft from '#models/nft'
import NotificationsController from '#controllers/notifications_controller'
import NotificationService from '#services/notification_service'
import Notification from '#models/notification'
export default class SocialsController {
  protected async getUser({ request, response, auth }: HttpContext) {
    const { link } = request.only(['link'])
    const USER_EXIST = await User.findBy('link', link)
    if (!USER_EXIST) {
      return response.status(200).json({ return: false, user: {} })
    }
    const following = await db.from('followers').innerJoin('users', 'users.id', 'id_followed').where('id_follower', USER_EXIST.id)
    const followers = await db.from('followers').innerJoin('users', 'users.id', 'id_follower').where('id_followed', USER_EXIST.id)
    const nftIds = await USER_EXIST.related('have_nft').query().select('id')
    //use Auth pour savoir si l'utilisateur connecté suit l'utilisateur
    // const CHECK_FOLLOW = await db.from('followers').where('id_follower', USER_EXIST.id).andWhere('id_followed', USER_EXIST.id)
    const listNft = await Nft.query().whereIn(
      'id',
      nftIds.map((nft) => nft.id)
    )
    const nfts = listNft.filter((nft) => {
      return nft.description && nft.image && nft.place && nft.hashtags && Number(nft.draft) === 0
    })
    let userInfo = {
      username: USER_EXIST.username,
      image: USER_EXIST.image,
      bio: '',
      link: '',
    }
    let nftList: Nft[] = []
    if (USER_EXIST.status === 'public') {
      userInfo = {
        username: USER_EXIST.username,
        image: USER_EXIST.image,
        bio: USER_EXIST.bio ? USER_EXIST.bio : '',
        link: USER_EXIST.link ? USER_EXIST.link : '',
      }
      nftList = nfts
    }

    return response.status(200).json({ return: true, user: { followers: followers.length, following: following.length, nfts: nftList, status: USER_EXIST.status, userInfo: userInfo } })
  }
  protected async followInformations({ request, response, auth }: HttpContext) {
    const { link } = request.only(['link'])
    const USER_LOGIN = await auth.use('api').user
    if (!USER_LOGIN) {
      return response.status(200).json({ return: 0 })
    }
    const USER_EXIST = await User.findBy('link', link)
    if (!USER_EXIST) {
      return response.status(200).json({ return: 1 })
    }
    if (USER_EXIST.id === USER_LOGIN.id) {
      return response.status(200).json({ return: 7 })
    }
    if (USER_EXIST.status === 'public') {
      const relation = await User.query().select("id_followed").innerJoin("followers", "users.id", "followers.id_followed").where('id_follower', "=", USER_LOGIN.id).andWhere('id_followed', "=", USER_EXIST.id)
      if (relation.length > 0) {
        NotificationsController
        return response.status(200).json({ return: 2 })
      }
      return response.status(200).json({ return: 3 })
    }
    else {
      const relation = await User.query().select("id_followed").innerJoin("followers", "users.id", "followers.id_followed").where('id_follower', "=", USER_LOGIN.id).andWhere('id_followed', "=", USER_EXIST.id)
      if (relation.length === 0) {
        const PRIVATE_RELATION = await User.query().select("minter_follow_receive").innerJoin("follow_requests", "users.id", "follow_requests.minter_follow_receive").where('minter_follow_up', "=", USER_LOGIN.id).andWhere('minter_follow_receive', "=", USER_EXIST.id).first()
        if (PRIVATE_RELATION) {
          return response.status(200).json({ return: 4 })
        }
        return response.status(200).json({ return: 5 })
      }
      return response.status(200).json({ return: 6 })
    }
  }
  protected async followUser({ request, response, auth }: HttpContext) {
    const { link, etat } = request.only(['link', 'etat'])
    const USER_LOGIN = await auth.use('api').user
    if (!USER_LOGIN) {
      return response.status(200).json({ return: 0 })
    }
    const USER_EXIST = await User.findBy('link', link)
    if (!USER_EXIST) {
      return response.status(200).json({ return: 1 })
    }
    switch (etat) {
      case 2:
        await db.from('followers').where('id_follower', USER_LOGIN.id).andWhere('id_followed', USER_EXIST.id).delete()
        return response.status(200).json({ return: 3 })
      case 3:
        await db.table('followers').insert({id_follower: USER_LOGIN.id, id_followed: USER_EXIST.id})
        await Notification.query().where('user_id',USER_EXIST.id).andWhere('type', 2).andWhere('link', USER_LOGIN.id).delete()
        await NotificationService.createNotification(USER_EXIST, 2, USER_LOGIN.id)
        return response.status(200).json({return: 2})
      case 4:
        await db.from('follow_requests').where('minter_follow_up', USER_LOGIN.id).andWhere('minter_follow_receive', USER_EXIST.id).delete()
        await Notification.query().where('user_id', USER_EXIST.id).andWhere('link', USER_LOGIN.id).andWhere('type', 1).delete()
        return response.status(200).json({ return: 5 })
      case 5:
        await db.table('follow_requests').insert({minter_follow_up: USER_LOGIN.id, minter_follow_receive: USER_EXIST.id})
        await NotificationService.createNotification(USER_EXIST, 1, USER_LOGIN.id)
        return response.status(200).json({ return: 4 })
      case 6:
        await db.from('followers').where('id_follower', USER_LOGIN.id).andWhere('id_followed', USER_EXIST.id).delete()
        return response.status(200).json({ return: 5 })
      case 7:
        await db.table('followers').insert({id_follower: USER_EXIST.id, id_followed: USER_LOGIN.id})
        await NotificationService.createNotification(USER_EXIST, 3, USER_LOGIN.id)
        await db.from('follow_requests').where('minter_follow_up', USER_EXIST.id).andWhere('minter_follow_receive', USER_LOGIN.id).update({etat: 1})
        return response.status(200).json({ return: 6 })
    }
  }
}
