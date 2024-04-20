import { BaseSeeder } from '@adonisjs/lucid/seeders'
import NotificationSetting from '#models/notification_setting'
export default class extends BaseSeeder {
  async run() {
    NotificationSetting.createMany([
      {
        id_minter: 1,
        follow_request: true,
        follow: true,
        mint: true,
        commentary_answer: true,
        commentary_thread: true,
      },
      {
        id_minter: 2,
        follow_request: true,
        follow: true,
        mint: true,
        commentary_answer: true,
        commentary_thread: true,
      },
      {
        id_minter: 3,
        follow_request: true,
        follow: true,
        mint: true,
        commentary_answer: true,
        commentary_thread: true,
      },
      {
        id_minter: 4,
        follow_request: true,
        follow: true,
        mint: true,
        commentary_answer: true,
        commentary_thread: true,
      },
    ])
  }
}
