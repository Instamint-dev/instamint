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
import AdminController from '#controllers/admin/admin_controller'
import Admin from '#models/admin'
import ViewAdminController from '#controllers/admin/view_admin_controller'

router.post('/register', '#controllers/auth_controller.register')
router.post('/connection', '#controllers/auth_controller.connection')
router.post('/forgotPassword', '#controllers/mail_tokens_controller.forgotPassword')
router.post('/checkTokenValid', '#controllers/mail_tokens_controller.checkTokenValid')
router.post('/generatePassword', '#controllers/mail_tokens_controller.generatePassword')
router.post('/mailRegister', '#controllers/mail_tokens_controller.mailRegister')
router.post('/checkUserExist', '#controllers/mail_tokens_controller.checkUserExist')
router.post('/checkEmailExist', '#controllers/mail_tokens_controller.checkEmailExist')
router.post('/checkDoubleAuthLogin', '#controllers/double_auths_controller.checkDoubleAuthLogin')

router.put('/admin/users/:id/disable', '#controllers/admin/admin_controller.disableUser')
router.delete('/admin/users/:id/delete', '#controllers/admin/admin_controller.deleteUser')
router.delete('/admin/tea-bags/:id/delete', '#controllers/admin/admin_controller.deleteTeaBag')
router.delete('/admin/nfts/:id/delete', '#controllers/admin/admin_controller.deleteNFT')
router.delete('/admin/commentaries/:id/delete', '#controllers/admin/admin_controller.deleteCommentary')
router.get('/admin/reports', '#controllers/admin/admin_controller.listReports')
router.post('/admin/login', '#controllers/admin/admin_controller.connection')
router.get('reports', () => {})
router.put('users/:id', () => {})
router.delete('users/:id', () => {})
router.post('/login', '#controllers/admin/view_admin_controller.login')

router.get('/', '#controllers/admin/view_admin_controller.index')
router.get('/dashboard', '#controllers/admin/view_admin_controller.dashboard')
router.get('/login', '#controllers/Admin/View_admin_controller.login')
router.get('/register', '#controllers/Admin/View_admin_controller.register')
router.get('/nft', '#controllers/admin/view_admin_controller.nft')
router.get('/minter', '#controllers/admin/view_admin_controller.minter')

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

export default router
