import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TeaBag from '#models/tea_bag'

export default class extends BaseSeeder {
  async run() {
    await TeaBag.createMany([
      {
        id: 5,
        cook: '[1,2]',
      },
    ])
  }
}
