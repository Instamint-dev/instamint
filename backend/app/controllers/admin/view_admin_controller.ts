import Admin from '#models/admin';
import { loginAdminValidator } from '#validators/admin'; 
import { HttpContext } from '@adonisjs/core/http';

export default class ViewAdminController {
    index({ view }: HttpContext) {
        return view.render('pages/admin/index', { name: 'connexion' });
    }
   
    login({ view }: HttpContext) {
        return view.render('pages/admin/login');
    } 

    async handleLogin({ request, auth, session, response }: HttpContext) {
        const { username, password } = await request.validate(loginAdminValidator);  
        const admin = await Admin.verifyCredentials(username, password);
        await auth.use('api').login(admin);
        session.flash("success", "Connexion ok!!");
        return response.redirect().toRoute("index");
    }

    async logout({ auth, session, response }: HttpContext) {
        await auth.use('api').logout(); 
        session.flash("success", "Déconnexion réussie!!");
        return response.redirect().toRoute("admin/login");  
    }
}
