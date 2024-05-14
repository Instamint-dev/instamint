import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        id: 1,
        username: 'anthony',
        email: 'anthonymathieu21@live.fr',
        password: 'azeAZE123&',
        image: 'https://instamintkami.blob.core.windows.net/instamint/user.png',
        status: 'private',
        link: 'anthony',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
      },
      {
        id: 2,
        username: 'kevin',
        email: 'kevinmetri.pro@gmail.com',
        password: 'azeAZE123&',
        image: 'https://instamintkami.blob.core.windows.net/instamint/user.png',
        status: 'public',
        link: 'kevin',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
      },
      {
        id: 3,
        username: 'islem',
        email: 'matouf94@gmail.com',
        password: 'azeAZE123&',
        image: 'https://instamintkami.blob.core.windows.net/instamint/user.png',
        status: 'public',
        link: 'islem',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
      },
      {
        id: 4,
        username: 'mame',
        email: 'islemharoun@gmail.com',
        password: 'azeAZE123&',
        image: 'https://instamintkami.blob.core.windows.net/instamint/user.png',
        status: 'public',
        link: 'mame',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
      },
      {
        id: 5,
        username: 'Le Hall des Minters',
        email: '',
        password: '',
        image: 'https://instamintkami.blob.core.windows.net/instamint/UUq.gif',
        status: 'public',
        link: 'HallOfMinters',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
      },
    ])
  }
}
