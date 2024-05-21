import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }
  async run() {
    await this.seed(await import('#database/seeders/notification_type_seeder'))
    await this.seed(await import('#database/seeders/user_seeder'))
    await this.seed(await import('#database/seeders/notification_setting_seeder'))
    await this.seed(await import('#database/seeders/nft_seeder'))
    await this.seed(await import('#database/seeders/have_nfts_seeder'))
    await this.seed(await import('#database/seeders/commentary_seeder'))
    await this.seed(await import('#database/seeders/teabag_seeder'))
    await this.seed(await import('#database/seeders/follower_seeder'))
    await this.seed(await import('#database/seeders/message_seeder'))
    await this.seed(await import('#database/seeders/emoji_seeder'))
  }
}
