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
  static WAIT_ACCEPT_JOIN_TEA_BAG_ACCEPT: number = 9
  static QUIT_TEA_BAG: number = 10
  static COOK_ACCEPT_JOIN_TEA_BAG: number = 11
  static COOK_EXIT_TEA_BAG: number = 12

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
      .innerJoin('users', 'users.id', 'followed')
      .where('follower', USER_EXIST.id)
    const followers = await db
      .from('followers')
      .innerJoin('users', 'users.id', 'follower')
      .where('followed', USER_EXIST.id)
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
        .select('id', 'description', 'image', 'place', 'hashtags', 'draft', 'link')
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
        await db.table('followers').insert({ follower: USER_LOGIN.id, followed: USER_EXIST.id })
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
        await db.table('followers').insert({ follower: USER_EXIST.id, followed: USER_LOGIN.id })
        await NotificationService.createNotification(USER_EXIST, 3, USER_LOGIN.id)
        await db
          .from('follow_requests')
          .where('minter_follow_up', USER_EXIST.id)
          .andWhere('minter_follow_receive', USER_LOGIN.id)
          .update({ etat: 1 })
        return response.status(200).json({ return: SocialsController.PRIVATE_UNFOLLOW })
    }
  }

  protected async followUserTeaBag({ request, response, auth }: HttpContext) {
    const { link, etat, idNotification } = request.only(['link', 'etat', 'idNotification'])
    const USER_LOGIN = await auth.use('api').user
    if (!USER_LOGIN) {
      return response.status(200).json({ return: 0 })
    }
    const USER_EXIST = await User.findBy('link', link)

    if (!USER_EXIST) {
      return response.status(200).json({ return: 1 })
    }

    switch (etat) {
      case SocialsController.WAIT_ACCEPT_JOIN_TEA_BAG:
        const existingCook = await db.from('tea_bags').select('cook').where('id', USER_EXIST.id)
        const c: number[][] = existingCook.map((item) => item.cook)

        for (const cooks of c) {
          if (cooks.includes(USER_LOGIN.id)) {
            const newCookValue = cooks.filter((cookId: number) => cookId !== USER_LOGIN.id)

            await db
              .from('tea_bags')
              .where('id', USER_EXIST.id)
              .update({ cook: JSON.stringify(newCookValue) })

            await db
              .from('followers')
              .where('follower', USER_LOGIN.id)
              .andWhere('followed', USER_EXIST.id)
              .delete()

            await Notification.query().where('message', 'like', `%${USER_LOGIN.username}%`).delete()
            this.deleteNotification(USER_LOGIN, USER_EXIST, 3)

            await db
              .from('tea_bags_requests')
              .where('minter_follow_up', USER_LOGIN.id)
              .andWhere('minter_follow_receive', USER_EXIST.id)
              .delete()

            return response.status(200).json({ return: SocialsController.WAIT_ACCEPT_JOIN_TEA_BAG })
          }
        }
        const existingRequest = await db
          .from('tea_bags_requests')
          .where({
            minter_follow_up: USER_LOGIN.id,
            minter_follow_receive: USER_EXIST.id,
          })
          .where('etat', 0)
          .first()

        if (existingRequest) {
          await db
            .from('tea_bags_requests')
            .where({
              minter_follow_up: USER_LOGIN.id,
              minter_follow_receive: USER_EXIST.id,
            })
            .delete()
          const a = await db.from('tea_bags').select('cook').where('id', USER_EXIST.id)
          const cooksArray: number[][] = a.map((item) => item.cook)
          for (const cooks of cooksArray) {
            for (const cook of cooks) {
              const user = await User.find(cook)
              if (!user) {
                continue
              }

              await this.deleteNotification(user, USER_EXIST, 7)
            }
          }
          return response.status(200).json({ return: SocialsController.WAIT_ACCEPT_JOIN_TEA_BAG })
        } else {
          await db.table('tea_bags_requests').insert({
            minter_follow_up: USER_LOGIN.id,
            minter_follow_receive: USER_EXIST.id,
            etat: 0,
          })
          const a = await db.from('tea_bags').select('cook').where('id', USER_EXIST.id)
          const cooksArray: number[][] = a.map((item) => item.cook)

          for (const cooks of cooksArray) {
            for (const cook of cooks) {
              const user = await User.find(cook)
              if (!user) {
                continue
              }
              await NotificationService.createNotificationTeaBag(user, 7, USER_EXIST.id, USER_LOGIN)
            }
          }

          return response
            .status(200)
            .json({ return: SocialsController.WAIT_ACCEPT_JOIN_TEA_BAG_ACCEPT })
        }
      case SocialsController.COOK_ACCEPT_JOIN_TEA_BAG:
        const a = await db.from('tea_bags').select('cook').where('id', USER_EXIST.id)
        const cooksArray: number[][] = a.map((item) => item.cook)
        for (const cooks of cooksArray) {
          for (const cook of cooks) {
            const user = await User.find(cook)
            if (!user) {
              continue
            }
            await this.deleteNotification(user, USER_EXIST, 8)
          }
        }

        const attend = await Notification.query().where('id', idNotification)
        const message = attend[0].message
        const match = message.match(/@(\w+)/)
        if (!match) {
          return
        }
        const USER_JOIN_TEA_BAG = await User.findBy('username', match[1])

        if (!USER_JOIN_TEA_BAG) {
          return
        }

        await db
          .from('tea_bags_requests')
          .innerJoin('tea_bags', 'tea_bags.id', 'tea_bags_requests.minter_follow_receive')
          .where('tea_bags_requests.minter_follow_receive', USER_EXIST.id)
          .where('tea_bags_requests.minter_follow_up', USER_JOIN_TEA_BAG.id)
          .where(db.raw('JSON_CONTAINS(cook, CAST(? AS JSON))', [JSON.stringify(USER_LOGIN.id)]))
          .update('etat', 1)

        const currentCookValue = await db.from('tea_bags').where('id', USER_EXIST.id).select('cook')

        const newCookValue = [...currentCookValue[0].cook, USER_JOIN_TEA_BAG.id]

        await db
          .from('tea_bags')
          .where('id', USER_EXIST.id)
          .update('cook', JSON.stringify(newCookValue))

        await db
          .table('followers')
          .insert({ follower: USER_JOIN_TEA_BAG.id, followed: USER_EXIST.id })

        await NotificationService.createNotificationTeaBag(
          USER_JOIN_TEA_BAG,
          8,
          USER_EXIST.id,
          USER_LOGIN
        )

        return response.status(200).json({ return: SocialsController.QUIT_TEA_BAG })

      case SocialsController.COOK_EXIT_TEA_BAG:
        const user = await auth.use('api').user
        if (!user) {
          return response.status(200).json({ return: 0 })
        }

        await db
          .from('followers')
          .where('follower', user.id)
          .andWhere('followed', USER_EXIST.id)
          .delete()

        await db
          .from('tea_bags')
          .where('id', USER_EXIST.id)
          .update('cook', db.raw('JSON_REMOVE(cook, ?)', [JSON.stringify(user.id)]))
        this.deleteNotification(USER_EXIST, user, 3)
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
      .where('follower', USER_LOGIN.id)
      .andWhere('followed', USER_EXIST.id)
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
      .where('follower', USER_LOGIN.id)
      .andWhere('followed', USER_EXIST.id)
      .delete()
  }
  private async checkIfFollow(USER_LOGIN: User, USER_EXIST: User) {
    return await User.query()
      .select('followed')
      .innerJoin('followers', 'users.id', 'followers.followed')
      .where('follower', '=', USER_LOGIN.id)
      .andWhere('followed', '=', USER_EXIST.id)
  }

  protected async joinTeaBag(ctx: HttpContext) {
    const { link } = ctx.request.only(['link'])
    const user = await ctx.auth.use('api').user

    const USER_EXIST = await User.findBy('link', link)

    if (!USER_EXIST) {
      return ctx.response.status(200).json({ return: -1 })
    }

    if (!user) {
      return ctx.response.status(200).json({ return: -1 })
    }

    const teaBags = await db
      .from('users')
      .select('id', 'username', 'image', 'bio', 'link')
      .where('id', USER_EXIST.id)
      .whereIn('id', (query) => {
        query.from('tea_bags').select('id').where('cook', 'like', `%${user.id}%`)
      })

    if (teaBags.length === 0) {
      const WAIT_FOR_JOIN = await db
        .query()
        .from('tea_bags_requests')
        .where('minter_follow_up', '=', user.id)
        .andWhere('minter_follow_receive', '=', USER_EXIST.id)
      if (WAIT_FOR_JOIN.length > 0) {
        return ctx.response
          .status(200)
          .json({ return: SocialsController.WAIT_ACCEPT_JOIN_TEA_BAG_ACCEPT })
      }
    } else {
      return ctx.response.status(200).json({ return: SocialsController.QUIT_TEA_BAG })
    }
    return ctx.response.status(200).json({ return: SocialsController.WAIT_ACCEPT_JOIN_TEA_BAG })
  }
}
