import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import NotificationService from '#services/notification_service'

export default class NotificationsController {
  protected async index({ response, auth }: HttpContext) {
    const user = await auth.use('api').user
    if (!user) {
      return response.status(200).json({ message: 'User not found' })
    }
    const notifications = await db.query().select("notifications.id", "notification_types.type", "message", "link", "created_at").from('notifications').innerJoin("notification_types", "notification_types.id", "notifications.id").where('user_id', user.id).orderBy('created_at', 'desc')
    return response.status(200).json(notifications)
  }
  protected async store({ request, response, auth }: HttpContext) {
    const { type, link } = request.only(['type', 'link'])
    const user = auth.use('api').user
    if (!user) {
      return response.status(200).json({ message: 'User not found' })
    }
    await NotificationService.createNotification(user, type, link)
    return response.status(200).json({ message: 'Notification created' })
  }
}
