import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ReportsController {
  async addReport(ctx: HttpContext) {
    const { report } = ctx.request.only(['report'])
    const user = ctx.auth.use('api').user
    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    if (report.type === 'NFT') {
      await db.table('report_nfts').insert({
        id_nft: report.idEntity,
        id_minter: user.id,
        report: report.message,
      })
    } else if (report.type === 'user') {
      await db.table('report_minters').insert({
        id_minter_report: report.idEntity,
        id_minter_reporter: user.id,
        report: report.message,
      })
    } else if (report.type === 'teaBag') {
      await db.table('report_tea_bags').insert({
        id_tea_bag: report.idEntity,
        id_minter: user.id,
        report: report.message,
      })
    }
    return ctx.response.status(200).json({ message: 'Report added' })
  }
}
