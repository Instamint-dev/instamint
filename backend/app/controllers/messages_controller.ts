import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Message from '#models/message'

export default class MessagesController {
  async getListMessages(ctx: HttpContext) {
    const user = ctx.auth.use('api').user
    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    return db
      .from('messages as m')
      .select(
        'm.id',
        'm.content',
        'm.send_date as sendDate',
        db.raw(
          '(CASE WHEN m.sender_id = ? THEN receiver.username ELSE sender.username END) as otherUsername',
          [user.id]
        ),
        db.raw(
          '(CASE WHEN m.sender_id = ? THEN receiver.image ELSE sender.image END) as otherImage',
          [user.id]
        ),
        db.raw(
          '(CASE WHEN m.sender_id = ? THEN receiver.id ELSE sender.id END) as otherId',
          user.id
        )
      )
      .join('users as sender', 'm.sender_id', 'sender.id')
      .join('users as receiver', 'm.receiver_id', 'receiver.id')
      .whereIn('m.id', function (query) {
        query
          .select(db.raw('MAX(id)'))
          .from('messages')
          .groupByRaw('LEAST(sender_id, receiver_id), GREATEST(sender_id, receiver_id)')
      })
      .where(function (builder) {
        builder
          .where(function (innerBuilder) {
            innerBuilder.where('m.sender_id', user.id).orWhere('m.receiver_id', user.id)
          })
          .andWhere(function (innerBuilder) {
            innerBuilder.where('m.sender_id', user.id).orWhere('m.receiver_id', user.id)
          })
      })
      .orderBy('send_date', 'desc')
  }
  async getMessageWithUser(ctx: HttpContext) {
    const user = ctx.auth.use('api').user
    const { otherId } = ctx.request.only(['otherId'])

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const message = await db
      .from('messages as m')
      .select(
        'm.id',
        'm.content',
        'm.send_date as sendDate',
        'm.sender_id as senderId',
        'm.receiver_id as receiverId',
        db.raw(
          '(CASE WHEN m.sender_id = ? THEN receiver.username ELSE sender.username END) as otherUsername',
          [user.id]
        )
      )
      .leftJoin('users as sender', 'm.sender_id', 'sender.id')
      .leftJoin('users as receiver', 'm.receiver_id', 'receiver.id')
      .where(function (builder) {
        builder
          .where('m.sender_id', user.id)
          .where('m.receiver_id', otherId)
          .orWhere(function (builder2) {
            builder2.where('m.sender_id', otherId).where('m.receiver_id', user.id)
          })
      })
      .orderBy('m.send_date', 'asc')

    if (message.length === 0) {
      return db
        .from('users')
        .select('users.id', 'users.username as otherUsername', 'users.image')
        .where('users.id', otherId)
    } else {
      return message
    }
  }

  async sendMessage(ctx: HttpContext) {
    const user = ctx.auth.use('api').user
    const { otherId, content } = ctx.request.only(['otherId', 'content'])

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }
    new Date().toISOString().slice(0, 19).replace('T', ' ')

    await Message.create({
      sender_id: user.id,
      receiver_id: otherId,
      content: content,
      send_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    })
  }
}
