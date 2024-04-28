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

router
  .group(() => {
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
    router.post('/disabledoubleAuth', '#controllers/double_auths_controller.disabledoubleAuth')
    router.post('/registerDraftNFT', '#controllers/nft_controller.registerDraftNFT')
    router.post('/getNFTsByUserDraft', '#controllers/nft_controller.getNFTsByUserDraft')
    router.post('/deleteDraftNFT', '#controllers/nft_controller.deleteDraftNFT')
    router.post('/getDraftNFT', '#controllers/nft_controller.getDraftNFT')
    router.post('/updateDraftNFT', '#controllers/nft_controller.updateDraftNFT')
    router.post('/getDraftsCompleted', '#controllers/nft_post_controller.getDraftsCompleted')
    router.post('/getDraftsPost', '#controllers/nft_post_controller.getDraftsPost')
  })
  .use([
    middleware.auth({
      guards: ['api'],
    }),
  ])
router.post('/searchNFT', '#controllers/nft_controller.searchNFT')
