import { BaseSeeder } from '@adonisjs/lucid/seeders'
import NotificationType from '#models/notification_type'
export default class extends BaseSeeder {
  async run() {
    NotificationType.createMany([
      {
        id: 1,
        type: 'Follow request',
      },
      {
        id: 2,
        type: 'Follow',
      },
      {
        id: 3,
        type: 'Follow request accepted',
      },
      {
        id: 4,
        type: 'Like',
      },
      {
        id: 5,
        type: 'Comment',
      },
      {
        id: 6,
        type: 'Mention',
      },
      {
        id: 7,
        type: 'Repost',
      },
    ])
  }
}
