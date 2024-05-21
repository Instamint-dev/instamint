import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Emoji from '#models/emoji'

export default class extends BaseSeeder {
  async run() {
    await Emoji.createMany([
      {
        id: 1,
        alias: 'emoji::1',
        name: 'https://instamintkami.blob.core.windows.net/instamint-emojis/ANBCGDHJAKDJAKD.png',
      },
      {
        id: 2,
        alias: 'emoji::2',
        name: 'https://instamintkami.blob.core.windows.net/instamint-emojis/JDJEKEKDKKD.png',
      },
      {
        id: 3,
        alias: 'emoji::3',
        name: 'https://instamintkami.blob.core.windows.net/instamint-emojis/JDJEKJDJKKE.png',
      },
      {
        id: 4,
        alias: 'emoji::4',
        name: 'https://instamintkami.blob.core.windows.net/instamint-emojis/KKSDLDLELD.png',
      },
      {
        id: 5,
        alias: 'emoji::5',
        name: 'https://instamintkami.blob.core.windows.net/instamint-emojis/LDEKEKDKKD.png',
      },
      {
        id: 6,
        alias: 'emoji::6',
        name: 'https://instamintkami.blob.core.windows.net/instamint-emojis/ODKEKKDKE.png',
      },
      {
        id: 7,
        alias: 'emoji::7',
        name: 'https://instamintkami.blob.core.windows.net/instamint-emojis/PAOHEJKDNJE.png',
      },
    ])
  }
}
