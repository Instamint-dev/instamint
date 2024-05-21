import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Follower from '#models/follower'

export default class extends BaseSeeder {
  async run() {
    Follower.createMany([
      {
        id: 1,
        follower: 2,
        followed: 5,
      },
      {
        id: 2,
        follower: 1,
        followed: 5,
      },
      {
        id: 3,
        follower: 2,
        followed: 1,
      },
      {
        id: 4,
        follower: 1,
        followed: 2,
      },
    ])
  }
}
