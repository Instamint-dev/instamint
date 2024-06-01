import { HttpContext } from '@adonisjs/core/http'
import Admin from '#models/admin'
import User from '#models/user'
import TeaBag from '#models/tea_bag'
import NFT from '#models/nft'
import Commentary from '#models/commentary'
import Report from '#models/report_minter'

export default class AdminController {
  
  async login({ request, response,auth }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password'])
      const isPasswordValid = await Admin.verifyCredentials(username, password)      
      const head = await auth
            .use('api_admin')
            .authenticateAsClient(isPasswordValid, [], { expiresIn: '1day' })

      if (!isPasswordValid) {
        return response.status(401).json({ message: 'Invalid credentials' })
      }
      response.cookie("head",head,{
        domain: '',
        path: '/',
        maxAge: '2h',
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
      })
      return response.redirect('/')
    } catch (error) {
      return response.status(500).json({ message: error })
    }
  }

async disableMinter({ params, response, view }: HttpContext) {
  try {
    const user = await User.findOrFail(params.id)
    user.is_not_active = !user.is_not_active
    await user.save()
    return view.render('pages/admin/minters.index')
  } catch (error) {
    console.error('Error disabling Minter:', error)
    return response.status(500).json({ message: 'Internal Server Error' })
  }
}

async deleteTeaBags({ params, response, view }: HttpContext) {
  try {
    const teaBag = await TeaBag.findOrFail(params.id)
    await teaBag.delete()
    const teaBags = await TeaBag.all()
    return view.render('pages/admin/teabags/index', { teaBag: teaBags, params: params })
  } catch (error) {
    console.error('Error deleting Tea Bag:', error)
    return response.status(500).json({ message: 'Internal Server Error' })
  }
}

async deleteNfts({ params, response, view, session }: HttpContext) {
  console.log(params);
  
   try {
    const nft = await NFT.findOrFail(params.id)
     await nft.delete()
     session.flash('success', 'NFT deleted successfully')
  const nfts = await NFT.all()
  return view.render('pages/admin/nfts/index', { nfts: nfts, params: params })
   } catch (error) {
     console.error('Error deleting NFT:', error)
     return response.status(500).json({ message: 'Internal Server Error' })
   }
}
 async reportCommentary({ params, request, response, view }: HttpContext) {
  try {
    const { reason } = request.all()
    const commentary = await Commentary.findOrFail(params.id)
    const report = new Report()
    report.id_minter_report = commentary.id
    report.id_minter_reporter = reason
    await report.save()
    return view.render('/commentaries.index')
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



