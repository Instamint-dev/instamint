import { HttpContext } from '@adonisjs/core/http'
import Commentary from '#models/commentary'
import User from '#models/user'
import TeaBag from '#models/tea_bag'
import NFT from '#models/nft'
import ReportMinter from '#models/report_minter'

export default class ViewAdminController {
  protected showLoginForm({ view }: HttpContext) {
    return view.render('pages/admin/login')
  }
  protected async index({ auth, view }: HttpContext) {
    const isloggedIn = await auth.check()
    return view.render('pages/admin/index', { isloggedIn })
  }

  protected async listMinters({ auth, view }: HttpContext) {
    const isloggedIn = auth.isAuthenticated
    const users = await User.all()
    return view.render('pages/admin/minters/index', { isloggedIn, users })
  }

  protected async dashboard({ auth, view }: HttpContext) {
    const isloggedIn = await auth.check()
    return view.render('pages/admin/dashboard', { isloggedIn })
  }

  protected async commentaries({ auth, view }: HttpContext) {
    const isloggedIn = auth.isAuthenticated
    const comments = await Commentary.all()
    return view.render('pages/admin/commentaries/index', { isloggedIn, comments })
  }

  protected async teabags({ auth, view }: HttpContext) {
    const isloggedIn = auth.isAuthenticated
    const teaBags = await TeaBag.all()
    return view.render('pages/admin/teabags/index', { isloggedIn, teaBags })
  }

  protected async nfts({ auth, view }: HttpContext) {
    const isloggedIn = auth.isAuthenticated
    const nfts = await NFT.all()
    return view.render('pages/admin/nfts/index', { isloggedIn, nfts })
  }

  protected async editMinter({ params, view }: HttpContext) {
    const users = await User.findOrFail(params.id)
    return view.render('pages/admin/minters/edit', { users })
  }

  protected async users({ auth, view }: HttpContext) {
    const isloggedIn = auth.isAuthenticated
    const users = await User.all()
    return view.render('pages/admin/users', { isloggedIn, users })
  }

  protected async login({ auth, view }: HttpContext) {
    const isloggedIn = auth.isAuthenticated
    return view.render('pages/admin/login', { isloggedIn })
  }

  protected async disconnect({ auth, response }: HttpContext) {
    await auth //logout()
    return response.redirect('/admin/login')
  }

  protected async indexTeaBags({ view }: HttpContext) {
    const teaBags = await TeaBag.all()
    return view.render('pages/admin/teabags', { teaBags })
  }

  protected async report({ view }: HttpContext) {
    const reportMinter = await ReportMinter.all()
    return view.render('pages/admin/commentaries/report_minter', { reportMinter })
  }
}
