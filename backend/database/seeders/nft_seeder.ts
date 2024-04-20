import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Nft from "#models/nft"
import { randomInt } from 'crypto'
export default class extends BaseSeeder {
  async run() {
    const Nfts = await Nft.createMany([
      {
        mint: randomInt(0, 1000),
        link: "https://instamintkami.blob.core.windows.net/instamint/10-5%20doodle%20do.jpg",
      }, {
        mint: randomInt(0, 1000),
        link: "https://instamintkami.blob.core.windows.net/instamint/F2DQCaSacAM--TB.jpeg",
      }, {
        mint: randomInt(0, 1000),
        link: "https://instamintkami.blob.core.windows.net/instamint/10-14.jpg",
      }, {
        mint: randomInt(0, 1000),
        link: "https://instamintkami.blob.core.windows.net/instamint/F3vheB4aoAAnZsh.jpeg",
      },
    ])
    Nfts.forEach(async (nft) => {
      await nft.related('user').attach([1, 2, 3, 4])
    })

  }
}
