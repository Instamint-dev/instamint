import Notification from '#models/notification'
import User from '#models/user'

export default class NotificationService {
  static async createNotification(user: User, type: number, link: number) {
    switch (type) {
      case 1:
        await Notification.create({
          user_id: user.id,
          type: 1,
          message: 'You have a new follow request',
          link: link,
        })
        break
      case 2:
        await Notification.create({
          user_id: user.id,
          type: 2,
          message: 'You have a new follower',
          link: link,
        })
        break
      case 3:
        await Notification.create({
          user_id: user.id,
          type: 3,
          message: 'Your follow request has been accepted',
          link: link,
        })
        break
      case 4:
        await Notification.create({
          user_id: user.id,
          type: 4,
          message: 'You have a new like on your post',
          link: link,
        })
        break
      case 5:
        await Notification.create({
          user_id: user.id,
          type: 5,
          message: 'You have a new comment on your post',
          link: link,
        })
        break
      case 6:
        await Notification.create({
          user_id: user.id,
          type: 6,
          message: 'You have been mentioned in a comment',
          link: link,
        })
        break
    }
  }

  static async createNotificationTeaBag(user: User, type: number, link: number, minter: User) {
    switch (type) {
      case 7:
        await Notification.create({
          user_id: user.id,
          type: 7,
          message: `@${minter.username} would join your tea bag`,
          link: link,
        })
        break

      case 8:
        await Notification.create({
          user_id: user.id,
          type: 3,
          message: `You have joined the tea bag of @${minter.username}`,
          link: link,
        })
        break
    }
  }

static async createNotificationExchange(user: User, type: number, link: number, minter: User) {
  switch (type) {
    case 9:
      await Notification.create({
        user_id: user.id,
        type: 9,
        message: `@${minter.username} would exchange NFT with you`,
        link: link,
      })
      break

    case 11:
      await Notification.create({
        user_id: minter.id,
        type: 11,
        message: `You have sent a request to exchange NFT with @${user.username}`,
        link: link,
      })
      break

      case 12:
        await Notification.create({
          user_id: minter.id,
          type: 12,
          message: `@${user.username} has accepted your request to exchange NFT`,
          link: link,
        })
        break

      case 10:
        await Notification.create({
          user_id: user.id,
          type: 12,
          message: `You have exchanged NFT with @${minter.username}`,
          link: link,
        })
        break

      case 13:
        await Notification.create({
          user_id: minter.id,
          type: 13,
          message: `@${user.username} has rejected your request to exchange NFT`,
          link: link,
        })
        break

      case 14:
        await Notification.create({
          user_id: user.id,
          type: 13,
          message: `You have rejected the request to exchange NFT with @${minter.username}`,
          link: link,
        })
        break
    }
  }
}
