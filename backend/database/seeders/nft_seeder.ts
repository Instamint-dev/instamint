import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Nft from '#models/nft'
export default class extends BaseSeeder {
  async run() {
    await Nft.createMany([
      {
        link: 'ABJDIEKDJJDE',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Paris',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/ABJDIEKDJJDE.jpg',
        price: 100,
      },
      {
        link: 'OAOOAOBBD',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Paris',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/OAOOAOBBD.jpg',
        price: 250,
      },
      {
        link: 'BBBBAAAAAA',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Paris',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/BBBBAAAAAA.jpg',
        price: 100,
      },
      {
        link: 'KKKKKKKKEEEV',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Paris',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/KKKKKKKKEEEV.jpg',
        price: 250,
      },
      {
        link: 'MEEEEEEEETCS',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Lyon',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/MEEEEEEEETCS.jpg',
        price: 100,
      },
      {
        link: 'SKIIIAAOOOOO',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Lille',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/SKIIIAAOOOOO.jpg',
        price: 250,
      },
      {
        id: 7,
        link: 'AOODOKIJDJJFF',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Paris',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/AOODOKIJDJJFF.jpg',
        price: 100,
      },
      {
        link: 'BAAAAASKKIEJD',
        description: 'This is a description',
        hashtags: '#hashtag1 #hashtag2 #hashtag3',
        place: 'Angers',
        draft: false,
        image: 'https://instamintkami.blob.core.windows.net/instamint-nft/BAAAAASKKIEJD.jpg',
        price: 250,
      },
    ])
  }
}
