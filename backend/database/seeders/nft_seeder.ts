import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Nft from '#models/nft'
import { randomInt } from 'node:crypto'
export default class extends BaseSeeder {
  async run() {
    const Nfts = await Nft.createMany([
      {
        mint: randomInt(0, 1000),
        link: 'HAHFBBPGIO',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Paris',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint/JIIBGIADGJ.jpg',
        price: 100,
      },
      {
        mint: randomInt(0, 1000),
        link: 'HAHFBBIGIJ',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Paris',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/HAHFBBIGIJ.jpg',
        price: 250,
      },
      {
        mint: randomInt(0, 1000),
        link: 'GFBHBBDGEE',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Paris',
        draft: true,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/GFBHBBDGEE.jpg',
        price: 150,
      },
      {
        mint: randomInt(0, 1000),
        link: 'HFICCIACBH',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Paris',
        draft: true,
        image: 'https://instamintkami.blob.core.windows.net/instamint/10-14.jpg',
        price: 200,
      },
    ])
    Nfts.forEach(async (nft) => {
      await nft.related('user').attach([1, 2, 3, 4])
    })
  }
}
