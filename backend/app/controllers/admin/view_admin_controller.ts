//import { loginAdminValidator } from '#validators/admin' 
import { HttpContext } from '@adonisjs/core/http'
import Commentary from '#models/commentary'
import User from '#models/user'

export default class ViewAdminController {
    index({ view,auth }: HttpContext) {
        return view.render('pages/admin/index', { name: 'connexion' })
    }
   
    login({ view }: HttpContext) {
        return view.render('pages/admin/login')
    } 
    
    
      nft({ view }: HttpContext) {
        return view.render('pages/admin/nft')
      }
    
     minter({ view }: HttpContext) {
        return view.render('pages/admin/minter')
      }
    
     dashboard({ view }: HttpContext) {
        return view.render('pages/admin/dashboard')
      }
      async indexCommentaries({ view }: HttpContext) {
        const commentaries = await Commentary.all()
        return view.render('pages/admin/commentaries/index', { commentaries })
      }
      async listMinters({ view }: HttpContext) {
        const minters = await User.query().where( 'role','minter' ) 
        return view.render('admin/minter', { minters })
      }
      async editMinter({ params, view }: HttpContext) {
        const minter = await User.findOrFail(params.id)
        return view.render('admin/edit_minter', { minter })
      }
                  
    //logout({ auth, session, response }: HttpContext) {
        //await auth.use('api').logout() 
        //session.flash("success", "Déconnexion réussie!!")
        //return response.redirect().toRoute("admin/login")  
    //}
}
