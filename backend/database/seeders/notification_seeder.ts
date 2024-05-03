import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Notification from '#models/notification'

export default class extends BaseSeeder {
  async run() {
    await Notification.createMany([
      {
        message: 'Notification 1',
        link: 'example1',
        type: 1,
        user_id: 1,
      },
      {
        message: 'Description 2',
        link: 'exemple2',
        type: 2,
        user_id: 2,
      },
      {
        message: 'Description 3',
        link: 'exemple3',
        type: 3,
        user_id: 1,
      },
      {
        message: 'Description 4',
        link: 'exemple4',
        type: 4,
        user_id: 2,
      },
      {
        message: 'Description 5',
        link: 'exemple5',
        type: 5,
        user_id: 3,
      },
      {
        message: 'Description 6',
        link: 'exemple6',
        type: 6,
        user_id: 1,
      },
      {
        message: 'Description 7',
        link: 'exemple7',
        type: 7,
        user_id: 4,
      },
    ])
  }
}
