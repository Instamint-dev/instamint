import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from "#models/user"

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        username: 'anthony',
        email: 'anthonymathieu21@live.fr',
        password: 'azeAZE123&'
      },
      {
        username: 'kevin',
        email: 'kevinmetri.pro@gmail.com',
        password: 'azeAZE123&'
      },
      {
        username: 'islem',
        email: 'matouf94@gmail.com',
        password: 'azeAZE123&'
      },
      {
        username: 'mame',
        email: 'islemharoun@gmail.com',
        password: 'azeAZE123&'
      }
    ])
  }
}
