/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'


router.post('/register', '#controllers/auth_controller.register')
router.post('/connection', '#controllers/auth_controller.connection')
router.post('/forgotPassword', '#controllers/mail_tokens_controller.forgotPassword')
router.post('/checkTokenValid', '#controllers/mail_tokens_controller.checkTokenValid')
router.post('/generatePassword', '#controllers/mail_tokens_controller.generatePassword')
router.post('/mailRegister', '#controllers/mail_tokens_controller.mailRegister')
router.post('/checkUserExist', '#controllers/mail_tokens_controller.checkUserExist')
router.post('/checkEmailExist', '#controllers/mail_tokens_controller.checkEmailExist')
router.post('/checkDoubleAuthLogin', '#controllers/double_auths_controller.checkDoubleAuthLogin')


router.group(() => {
 router.post('/updateProfil', '#controllers/user_controller.update')
 router.post('/getDataProfil', '#controllers/user_controller.getUserProfile')
 router.post('/changePassword', '#controllers/user_controller.updatePassword')
 router.post('/logout', '#controllers/auth_controller.logout')
 router.post(
      '/generateQrCode',
      '#controllers/double_auths_controller.enableTwoFactorAuthentication'
    )
    router.post('/checkDoubleAuth', '#controllers/double_auths_controller.checkDoubleAuth')
    router.post('/doubleAuthEnable', '#controllers/double_auths_controller.doubleAuthEnable')
    router.post('/check-login', '#controllers/user_controller.checkLoginExists')
    router.post('/check-mail', '#controllers/user_controller.checkEmailExists')
    router.post('/disabledoubleAuth', '#controllers/double_auths_controller.disabledoubleAuth')
    router.post('/registerDraftNFT', '#controllers/nft_controller.registerDraftNFT')
    router.post('/getNFTsByUser', '#controllers/nft_controller.getNFTsByUser')
    router.post('/deleteDraftNFT', '#controllers/nft_controller.deleteDraftNFT')
    router.post('/getDraftNFT', '#controllers/nft_controller.getDraftNFT')
    router.post('/updateDraftNFT', '#controllers/nft_controller.updateDraftNFT')
    router.post('/searchNFT', '#controllers/nft_controller.searchNFT')
  })
  .use([
    middleware.auth({
      guards: ['api'],
    }),
  ])
    router.get('/login', '#controllers/admin/view_admin_controller.showLoginForm')
    router.post('/login', '#controllers/admin/admin_controller.login')
    router.get('/', '#controllers/admin/view_admin_controller.index')
    router.get('/dashboard', '#controllers/admin/view_admin_controller.dashboard')
    router.get('/minters.index', '#controllers/admin/view_admin_controller.listMinters')
    router.get('/minters/:id/edit', '#controllers/admin/view_admin_controller.editMinter')
    router.post('/minters/:id', '#controllers/admin/view_admin_controller.deleteMinter')
    router.get('/commentaries.index', '#controllers/admin/view_admin_controller.commentares')
    router.get('/teabags.index', '#controllers/admin/view_admin_controller.teabags')
    router.get('/nfts.index', '#controllers/admin/view_admin_controller.nfts')
    router.post('/logout', '#controllers/admin/view_admin_controller.logout', )
    router.post('/nfts.delete', '#controllers/admin/admin_controller.deleteNfts')
    
  // router.group(() => {

    
    

  // })
  // .use(
  //   [
  //     middleware.admin({
  //       guards:["api_admin"],
  //     })
  //   ])
export default router