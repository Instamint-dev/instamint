import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Admin from '#models/admin'
export default class extends BaseSeeder {
  async run() {
    Admin.createMany([
      {
        username: 'test',
        password: 'azeAZE123',
      },
    ])
  }
}
