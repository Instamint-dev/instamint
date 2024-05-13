import { HttpContext } from '@adonisjs/core/http';


export default class ViewAdminController {
    public async index({ view }: HttpContext) {
      return view.render('pages/admin/index', { name: 'connexion' })
    }

    public async login({ view }: HttpContext) {
      return view.render('pages/admin/login', )
    }  
  
    public async nft({ view }: HttpContext) {
      return view.render('pages/admin/nft')
    }
  
    public async minter({ view }: HttpContext) {
      return view.render('pages/admin/minter')
    }

    public async disableUser({ view }: HttpContext) {
      return view.render('pages/admin/disableUser')
    }

    public async layouts({ view }: HttpContext) {
      return view.render('pages/admin/layouts')
    }
  
    public async dashboard({ view }: HttpContext) {
      return view.render('pages/admin/dashboard')
    }
}