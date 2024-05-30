
import { HttpContext } from '@adonisjs/core/http'
import Commentary from '#models/commentary'
import User from '#models/user'
import Admin from '#models/admin'
import TeaBag from '#models/tea_bag'
import NFT from '#models/nft'
import Report from '#models/report_minter'


export default class ViewAdminController {

  // public showLoginForm({ view }: HttpContext) {
  //   return view.render('pages/login')
  // }

  protected showLoginForm({ view }: HttpContext) {
    return view.render('pages/admin/login')
  }
  protected index({ view, }: HttpContext) {
        return view.render('pages/admin/index', { name: 'connexion' })
    }
     
    async users({ view }: HttpContext) {
      const users = await User.all()
      return view.render('pages/admin/users/index', { users })
    }

    protected dashboard({ view }: HttpContext) {
      return view.render('pages/admin/dashboard')
    }
     
    protected login({ view }: HttpContext) {
        return view.render('pages/admin/login')
    } 
    
    protected teabags({ view }: HttpContext) {
      return view.render('pages/admin/teabags/index')
  } 

  async indexTeaBags({ view }: HttpContext) {
    const teaBags = await TeaBag.all()
    return view.render('pages/admin/teabags/index', { teaBags })
  }

   protected async nfts({ view }: HttpContext) {
    const nfts = await NFT.all()
    return view.render('pages/admin/nfts/index', { nfts })
  }
  
    
  protected async listMinters({ view }: HttpContext) {
    const users = await User.all()
    return view.render('pages/admin/minters/index', { users })
  }

  protected async editMinter({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return view.render('pages/admin/minters/edit', { user })
  }

  public async commentares({ view }: HttpContext) {
    const comments = await Commentary.all()
    return view.render('pages/admin/commentaries/index', { comments })
  }
 }
