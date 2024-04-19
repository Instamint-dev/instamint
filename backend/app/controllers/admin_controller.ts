import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import TeaBag from '#models/tea_bag'
import NFT from '#models/nft'
import Report from '#models/report_minter'
import Commentary from '#models/commentary'

export default class AdminController {
  public async disableUser({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      user.is_disabled = true
      await user.save()
      return response.status(200).json({ message: 'Minter disabled successfully' })
    } catch (error) {
      console.error('Error disabling Minter:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async deleteUser({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
      console.error('Error deleting User:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async deleteTeaBag({ params, response }: HttpContext) {
    try {
      const teaBag = await TeaBag.findOrFail(params.id)
      await teaBag.delete()
      return response.status(200).json({ message: 'Tea Bag deleted successfully' })
    } catch (error) {
      console.error('Error deleting Tea Bag:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async deleteNFT({ params, response }: HttpContext) {
    try {
      const nft = await NFT.findOrFail(params.id)
      await nft.delete()
      return response.status(200).json({ message: 'NFT deleted successfully' })
    } catch (error) {
      console.error('Error deleting NFT:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async deleteCommentary({ params, response }: HttpContext) {
    try {
      const commentary = await Commentary.findOrFail(params.id)
      await commentary.delete()
      return response.status(200).json({ message: 'Commentary deleted successfully' })
    } catch (error) {
      console.error('Error deleting Commentary:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  public async listReports({ response }: HttpContext) {
    try {
      const reports = await Report.all()
      return response.status(200).json({ reports })
    } catch (error) {
      console.error('Error listing reports:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
