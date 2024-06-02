import { HttpContext } from '@adonisjs/core/http'
import Admin from '#models/admin'
import User from '#models/user'
import TeaBag from '#models/tea_bag'
import NFT from '#models/nft'
import Commentary from '#models/commentary'
import Report from '#models/report_minter'

export default class AdminController {
  async login({ request, response, auth }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password'])
      const isPasswordValid = await Admin.verifyCredentials(username, password)
      
      if (!isPasswordValid) {
        return response.status(401).json({ message: 'Invalid credentials' })
      }

      const head = await auth.use('api_admin').authenticateAsClient(isPasswordValid, [], { expiresIn: '1day' })

     
      response.cookie('head', head, {
        domain: '',
        path: '/',
        maxAge: '2h',
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      return response.redirect('/')
    } catch (error) {
      console.error('Error connexion')
      return response.status(500).json({ message: error })
    }
  }

  async disableMinter({ params, response, }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      user.is_not_active = !user.is_not_active
      await user.save()
      return response.redirect('pages/admin/minters.index')
    } catch (error) {
      console.error('Error disabling Minter:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async deleteTeaBag({ params, response, }: HttpContext) {
    try {
      const teaBag = await TeaBag.findOrFail(params.id)
      await teaBag.delete()
      return response.redirect('pages/admin/teabags/index', )
    } catch (error) {
      console.error('Error deleting Tea Bag:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async deleteNfts({ params, response, session }: HttpContext) {
    try {
      const nft = await NFT.findOrFail(params.id)
      await nft.delete()
      session.flash('success', 'NFT deleted successfully')
      return response.redirect('/admin/nfts',)
    } catch (error) {
      console.error('Error deleting NFT:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }
  async reportCommentary({ params, request, response, }: HttpContext) {
    try {
      const { reason } = request.all()
      const commentary = await Commentary.findOrFail(params.id)
      const report = new Report()
      report.id_minter_report = commentary.id
      report.id_minter_reporter = reason
      await report.save()
      return response.redirect('/admin/commentaries',)
    } catch (error) {
      console.error('Error reporting Commentary:', error)
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async deleteMinter({ params, response }: HttpContext) {
    const minter = await User.findOrFail(params.id)
    await minter.delete()
    return response.redirect('/admin/minters')
  }
}