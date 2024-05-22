import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ReportsController {
  async addReport(ctx: HttpContext) {
    const { report } = ctx.request.only(['report'])
    const user = ctx.auth.use('api').user
    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const existingReport = await this.checkExistingReport(user.id, report.type, report.idEntity)

    if (existingReport) {
      return ctx.response.json({
        message: 'You have already reported this ' + report.type + ' before',
        status: false,
      })
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
    } else if (report.type === 'commentary') {
      await db.table('report_commentaries').insert({
        id_commentary: report.idEntity,
        id_minter: user.id,
        report: report.message,
      })
    }
    return ctx.response.status(200).json({ message: 'Report added', status: true })
  }

  async checkExistingReport(userId: number, type: string, entityId: number) {
    let tableName
    switch (type) {
      case 'NFT':
        tableName = 'report_nfts'
        break
      case 'user':
        tableName = 'report_minters'
        break
      case 'teaBag':
        tableName = 'report_tea_bags'
        break
      case 'commentary':
        tableName = 'report_commentaries'
        break
      default:
        return null
    }

    return await db
      .from(tableName)
      .where('id_minter', userId)
      .where('id_' + type.toLowerCase(), entityId)
      .first()
  }
}
