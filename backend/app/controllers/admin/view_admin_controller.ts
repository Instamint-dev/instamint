import { HttpContext } from '@adonisjs/core/http';


export default class ViewAdminController {
     index({ view }: HttpContext) {
      return view.render('pages/admin/index', { name: 'connexion' })
    }

     register({ view }: HttpContext) {
      return view.render('pages/admin/register', )
    }  
   
     login({ view }: HttpContext) {
      return view.render('pages/admin/login', )
    }  
  
     nft({ view }: HttpContext) {
      return view.render('pages/admin/nft')
    }
  
     minter({ view }: HttpContext) {
      return view.render('pages/admin/minter')
    }

     disableUser({ view }: HttpContext) {
      return view.render('pages/admin/disableUser')
    }

     layouts({ view }: HttpContext) {
      return view.render('pages/admin/layouts')
    }
  
     dashboard({ view }: HttpContext) {
      return view.render('pages/admin/dashboard')
    }
}