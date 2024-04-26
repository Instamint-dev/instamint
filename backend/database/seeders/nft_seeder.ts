import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Nft from '#models/nft'
import { randomInt } from 'node:crypto'
export default class extends BaseSeeder {
  // async run() {
  //   const Nfts = await Nft.createMany([
  //     {
  //       mint: randomInt(0, 1000),
  //       link: 'https://instamintkami.blob.core.windows.net/instamint/10-5%20doodle%20do.jpg',
  //       description: 'This is a description',
  //       hashtags: '#hashtag1 #hashtag2 #hashtag3',
  //       place: 'Paris',
  //       draft: false,
  //       image: 'https://instamintkami.blob.core.windows.net/instamint-nft/pp.jpg',
  //     },
  //     {
  //       mint: randomInt(0, 1000),
  //       link: 'https://instamintkami.blob.core.windows.net/instamint-nft/pp.jpg',
  //       description: 'This is a description',
  //       hashtags: '#hashtag1 #hashtag2 #hashtag3',
  //       place: 'Paris',
  //       draft: false,
  //       image: 'https://instamintkami.blob.core.windows.net/instamint-nft/pp.jpg',
  //     },
  //     {
  //       mint: randomInt(0, 1000),
  //       link: 'https://instamintkami.blob.core.windows.net/instamint-nft/pp.jpg',
  //       description: 'This is a description',
  //       hashtags: '#hashtag1 #hashtag2 #hashtag3',
  //       place: 'Paris',
  //       draft: false,
  //       image: 'https://instamintkami.blob.core.windows.net/instamint-nft/pp.jpg',
  //     },
  //     {
  //       mint: randomInt(0, 1000),
  //       link: 'https://instamintkami.blob.core.windows.net/instamint/F3vheB4aoAAnZsh.jpeg',
  //       description: 'This is a description',
  //       hashtags: '#hashtag1 #hashtag2 #hashtag3',
  //       place: 'Paris',
  //       draft: false,
  //       image: 'https://instamintkami.blob.core.windows.net/instamint-nft/pp.jpg',
  //     },
  //   ])
  //   Nfts.forEach(async (nft) => {
  //     await nft.related('user').attach([1, 2, 3, 4])
  //   })
  // }
}
