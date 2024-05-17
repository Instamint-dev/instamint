import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'
import Nft from '#models/nft'
export default class NotificationsController {
  protected async index({ response, auth }: HttpContext) {
    const user = await auth.use('api').user
    if (!user) {
      return response.status(200).json({ message: 'User not found' })
    }
    const notifications = await db
      .query()
      .select(
        'notifications.id',
        'notification_types.type',
        'message',
        'link',
        'created_at',
        'notifications.type as id_type',
        'user_id'
      )
      .from('notifications')
      .innerJoin('notification_types', 'notification_types.id', 'notifications.type')
      .where('user_id', user.id)
      .orderBy('created_at', 'desc')
    await this.processNotifications(user, notifications)
      .then((newNotifications) => {
        return response.status(200).json(newNotifications)
      })
      .catch((error) => {
        return response.status(500).json({ message: error.message })
      })
  }
  protected async processNotifications(
    user: User,
    notifications: {
      id: number
      type: string
      message: string
      link: string
      created_at: string
      id_type: number
      user_id: number
      username: string
    }[]
  ) {
    const newNotifications = await Promise.all(
      notifications.map(async (notification) => {
        let link = notification.link
        let ID_TYPE = notification.id_type
        let USERNAME = ''
        // Replace link with user link
        if (
          notification.id_type === 1 ||
          notification.id_type === 2 ||
          notification.id_type === 3
        ) {
          const USER_LINK = await User.findBy('id', notification.link)
          if (USER_LINK) {
            link = USER_LINK.link || ''
            const FOLLOW_REQUEST_QUERY = await db
              .from('follow_requests')
              .where('minter_follow_up', USER_LINK.id)
              .andWhere('minter_follow_receive', notification.user_id)
              .andWhere('etat', 1)
            if (FOLLOW_REQUEST_QUERY.length > 0) {
              ID_TYPE = 0
            }
            USERNAME = USER_LINK.username || ''
          }
        }
        // Replace the link with the publication link
        if (
          notification.id_type === 4 ||
          notification.id_type === 5 ||
          notification.id_type === 6
        ) {
          const POST_LINK = await Nft.findBy('id', notification.link)
          if (POST_LINK) {
            link = POST_LINK.link
          }
        }

        if (notification.id_type === 7) {
          const match = notification.message.match(/@(\w+)/)
          if (!match) {
            return
          }
          const USER_JOIN_TEA_BAG = await User.findBy('username', match[1])

          if (!USER_JOIN_TEA_BAG) {
            return
          }
          const USER_LINK = await User.findBy('id', notification.link)
          if (USER_LINK) {
            link = USER_LINK.link || ''

            const FOLLOW_REQUEST_QUERY = await db
              .from('tea_bags_requests')
              .innerJoin('tea_bags', 'tea_bags.id', 'tea_bags_requests.minter_follow_receive')
              .where('tea_bags_requests.minter_follow_receive', USER_LINK.id)
              .where('tea_bags_requests.minter_follow_up', USER_JOIN_TEA_BAG.id)
              .where(db.raw('JSON_CONTAINS(cook, CAST(? AS JSON))', [JSON.stringify(user.id)]))
              .where('etat', 1)

            if (FOLLOW_REQUEST_QUERY.length > 0) {
              ID_TYPE = 0
            }
            USERNAME = USER_LINK.username || ''
          }
        }
        return {
          id: notification.id,
          type: notification.type,
          link: link,
          message: notification.message,
          CREATED_AT: notification.created_at,
          ID_TYPE: ID_TYPE,
          USERNAME: USERNAME,
        }
      })
    )
    return newNotifications
  }
}
