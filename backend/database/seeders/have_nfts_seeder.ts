import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Nft from '#models/nft'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const NFTs = await Nft.all()
    const usersCount = 4

    await Promise.all(
      NFTs.map(async (nft, index) => {
        const userId = (index % usersCount) + 1
        const user = await User.findBy('id', userId)
        if (!user) {
          throw new Error(`User with id ${userId} not found`)
        }
        user.related('have_nft').attach([nft.id])
      })
    )
  }
}
