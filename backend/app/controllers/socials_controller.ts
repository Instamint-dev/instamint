import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import Nft from '#models/nft'
import NotificationService from '#services/notification_service'
import Notification from '#models/notification'
export default class SocialsController {
  static PUBLIC_IS_FOLLOW: number = 2
  static PUBLIC_UNFOLLOW: number = 3
  static PRIVATE_DELETE_INVIT_FOLLOW: number = 4
  static PRIVATE_INVIT_FOLLOW: number = 5
  static PRIVATE_UNFOLLOW: number = 6
  static PRIVATE_ACCEPT_FOLLOW: number = 7
  static WAIT_ACCEPT_JOIN_TEA_BAG: number = 8

  protected async getUser({ request, response }: HttpContext) {
    let listNft: Nft[] = []
    const { link } = request.only(['link'])
    const USER_EXIST = await User.findBy('link', link)
    if (!USER_EXIST) {
      return response.status(200).json({ return: false, user: {} })
    }

    const res = await db.from('tea_bags').where('id', USER_EXIST.id)
    const ifUser = res.length === 0

    const following = await db
      .from('followers')
      .innerJoin('users', 'users.id', 'id_followed')
      .where('id_follower', USER_EXIST.id)
    const followers = await db
      .from('followers')
      .innerJoin('users', 'users.id', 'id_follower')
      .where('id_followed', USER_EXIST.id)
    const nftIds = await USER_EXIST.related('have_nft').query().select('id')

    const nftCounts = await db
      .from('have_nfts')
      .select('id_nft')
      .count('* as count')
      .whereIn(
        'id_nft',
        nftIds.map((nft) => nft.id)
      )
      .groupBy('id_nft')

    if (ifUser) {
      const uniqueNfts = nftCounts.filter((nftCount) => nftCount.count === 1)
      listNft = await Nft.query().whereIn(
        'id',
        uniqueNfts.map((nft) => nft.id_nft)
      )
    } else {
      listNft = await USER_EXIST.related('have_nft')
        .query()
        .select('description', 'image', 'place', 'hashtags', 'draft', 'link')
    }
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
    const USER_IS_TEABAG = await db.from('tea_bags').where('id', USER_EXIST.id)
    const isTeaBag = USER_IS_TEABAG.length > 0

    return response.status(200).json({
      return: true,
      user: {
        followers: followers.length,
        following: following.length,
        nfts: nftList,
        status: USER_EXIST.status,
        userInfo: userInfo,
        isTeaBag: isTeaBag,
      },
    })
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
      const relation = await this.checkIfFollow(USER_LOGIN, USER_EXIST)
      if (relation.length > 0) {
        return response.status(200).json({ return: 2 })
      }
      return response.status(200).json({ return: 3 })
    } else {
      const relation = await this.checkIfFollow(USER_LOGIN, USER_EXIST)
      if (relation.length === 0) {
        const PRIVATE_RELATION = await db
          .query()
          .from('follow_requests')
          .where('minter_follow_up', '=', USER_LOGIN.id)
          .andWhere('minter_follow_receive', '=', USER_EXIST.id)
        if (PRIVATE_RELATION.length > 0) {
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
      case SocialsController.PUBLIC_IS_FOLLOW:
        this.deleteFollower(USER_LOGIN, USER_EXIST)
        this.deleteNotification(USER_EXIST, USER_LOGIN, 2)
        return response.status(200).json({ return: SocialsController.PUBLIC_UNFOLLOW })
      case SocialsController.PUBLIC_UNFOLLOW:
        await db
          .table('followers')
          .insert({ id_follower: USER_LOGIN.id, id_followed: USER_EXIST.id })
        await NotificationService.createNotification(USER_EXIST, 2, USER_LOGIN.id)
        return response.status(200).json({ return: SocialsController.PUBLIC_IS_FOLLOW })
      case SocialsController.PRIVATE_DELETE_INVIT_FOLLOW:
        this.deleteFollowRequest(USER_LOGIN, USER_EXIST)
        this.deleteNotification(USER_EXIST, USER_LOGIN, 1)
        return response.status(200).json({ return: 5 })
      case SocialsController.PRIVATE_INVIT_FOLLOW:
        await db.table('follow_requests').insert({
          minter_follow_up: USER_LOGIN.id,
          minter_follow_receive: USER_EXIST.id,
          etat: 0,
        })
        await NotificationService.createNotification(USER_EXIST, 1, USER_LOGIN.id)
        return response.status(200).json({ return: SocialsController.PRIVATE_DELETE_INVIT_FOLLOW })
      case SocialsController.PRIVATE_UNFOLLOW:
        this.deleteFollower(USER_LOGIN, USER_EXIST)
        this.deleteFollowRequest(USER_LOGIN, USER_EXIST)
        this.deleteNotification(USER_EXIST, USER_LOGIN, 1)
        this.deleteNotification(USER_LOGIN, USER_EXIST, 3)
        return response.status(200).json({ return: SocialsController.PRIVATE_INVIT_FOLLOW })
      case SocialsController.PRIVATE_ACCEPT_FOLLOW:
        await db
          .table('followers')
          .insert({ id_follower: USER_EXIST.id, id_followed: USER_LOGIN.id })
        await NotificationService.createNotification(USER_EXIST, 3, USER_LOGIN.id)
        await db
          .from('follow_requests')
          .where('minter_follow_up', USER_EXIST.id)
          .andWhere('minter_follow_receive', USER_LOGIN.id)
          .update({ etat: 1 })
        return response.status(200).json({ return: SocialsController.PRIVATE_UNFOLLOW })
      case SocialsController.WAIT_ACCEPT_JOIN_TEA_BAG:
        const a = await db.from('tea_bags').select('cook').where('id', USER_EXIST.id)
        const cooksArray: number[][] = a.map((item) => item.cook)

        for (const cooks of cooksArray) {
          for (const cook of cooks) {
            const user = await User.find(cook)
            if (!user) {
              continue
            }
            await db.table('follow_requests').insert({
              minter_follow_up: USER_EXIST.id,
              minter_follow_receive: user.id,
              etat: 0,
            })
            await NotificationService.createNotification(user, 7, USER_EXIST.id)
          }
        }
        return response.status(200).json({ return: SocialsController.WAIT_ACCEPT_JOIN_TEA_BAG })
    }
  }
  protected async isFollowPrivate({ request, response, auth }: HttpContext) {
    const { link } = request.only(['link'])
    const USER_LOGIN = await auth.use('api').user
    if (!USER_LOGIN) {
      return response.status(200).json({ return: 0 })
    }
    const USER_EXIST = await User.findBy('link', link)
    if (!USER_EXIST) {
      return response.status(200).json({ return: 0 })
    }
    const PRIVATE_RELATION = await db
      .query()
      .from('followers')
      .where('id_follower', USER_LOGIN.id)
      .andWhere('id_followed', USER_EXIST.id)
    if (PRIVATE_RELATION.length > 0) {
      return response.status(200).json({ return: 1 })
    }
    return response.status(200).json({ return: 2 })
  }
  private async deleteFollowRequest(USER_LOGIN: User, USER_EXIST: User) {
    await db
      .from('follow_requests')
      .where('minter_follow_up', USER_LOGIN.id)
      .andWhere('minter_follow_receive', USER_EXIST.id)
      .delete()
  }
  private async deleteNotification(USER_EXIST: User, USER_LOGIN: User, type: number) {
    await Notification.query()
      .where('user_id', USER_EXIST.id)
      .andWhere('link', USER_LOGIN.id)
      .andWhere('type', type)
      .delete()
  }
  private async deleteFollower(USER_LOGIN: User, USER_EXIST: User) {
    await db
      .from('followers')
      .where('id_follower', USER_LOGIN.id)
      .andWhere('id_followed', USER_EXIST.id)
      .delete()
  }
  private async checkIfFollow(USER_LOGIN: User, USER_EXIST: User) {
    return await User.query()
      .select('id_followed')
      .innerJoin('followers', 'users.id', 'followers.id_followed')
      .where('id_follower', '=', USER_LOGIN.id)
      .andWhere('id_followed', '=', USER_EXIST.id)
  }
}
