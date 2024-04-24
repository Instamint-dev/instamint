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
router.post('/check-login', '#controllers/user_controller.checkLoginExists')
router.post('/check-mail', '#controllers/user_controller.checkEmailExists')

router
  .group(() => {
    router.post('/updateProfil', '#controllers/user_controller.update')
    router.post('/getDataProfil', '#controllers/user_controller.getUserProfile')
    router.post('/changePassword', '#controllers/user_controller.updatePassword')
    router.post('/logout', '#controllers/auth_controller.logout')
    router.post('/generateQrCode', '#controllers/double_auths_controller.enableTwoFactorAuthentication')
    router.post('/checkDoubleAuth', '#controllers/double_auths_controller.checkDoubleAuth')
    router.post('/doubleAuthEnable', '#controllers/double_auths_controller.doubleAuthEnable')
  })
  .use([
    middleware.auth({
      guards: ['api'],
    }),
  ])
