import { HttpContext } from '@adonisjs/core/http';


export default class ViewAdminController {
    public async index({ view }: HttpContext) {
      return view.render('pages/admin/index', { name: 'connexion' })
    }

    public async loginPost({ request, view }: HttpContext) {
      const { name } = request.all()
      return view.render('pages/admin/login', { name })
    }  
  
    public async nft({ view }: HttpContext) {
      return view.render('pages/admin/nft')
    }
  
    public async minter({ view }: HttpContext) {
      return view.render('pages/admin/minter')
    }
  
    public async dashboard({ view }: HttpContext) {
      return view.render('pages/admin/dashboard')
    }
}