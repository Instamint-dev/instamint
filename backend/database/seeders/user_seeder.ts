import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const Users = await User.createMany([
      {
        id: 1,
        username: 'anthony',
        email: 'anthonymathieu21@live.fr',
        password: 'azeAZE123&',
        image: 'https://instamintkami.blob.core.windows.net/instamint/user.png',
        status: 'public',
      },
      {
        id: 2,
        username: 'kevin',
        email: 'kevinmetri.pro@gmail.com',
        password: 'azeAZE123&',
        image: 'https://instamintkami.blob.core.windows.net/instamint/user.png',
        status: 'public',

      },
      {
        id: 3,
        username: 'islem',
        email: 'matouf94@gmail.com',
        password: 'azeAZE123&',
        image: 'https://instamintkami.blob.core.windows.net/instamint/user.png',
        status: 'public',
      },
      {
        id: 4,
        username: 'mame',
        email: 'islemharoun@gmail.com',
        password: 'azeAZE123&',
        image: 'https://instamintkami.blob.core.windows.net/instamint/user.png',
        status: 'public',
      },
    ])
    Users.forEach(async (user) => {
      await user.related('followers').attach([1, 2, 3, 4])
    })
  }
}
