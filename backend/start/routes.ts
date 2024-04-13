/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.post('/register', '#controllers/auth_controller.register')
router.post('/connection', '#controllers/auth_controller.connection')
router.post('/updateProfil', '#controllers/user_controller.update')
router.post('/user/profile', '#controllers/user_controller.getUserProfile')
router.post('/forgotPassword', '#controllers/mail_tokens_controller.forgotPassword')
router.post('/checkTokenValid', '#controllers/mail_tokens_controller.checkTokenValid')
router.post('/generatePassword', '#controllers/mail_tokens_controller.generatePassword')
router.post('/mailRegister', '#controllers/mail_tokens_controller.mailRegister')
router.post('/checkUserExist', '#controllers/mail_tokens_controller.checkUserExist')
router.post('/checkEmailExist', '#controllers/mail_tokens_controller.checkEmailExist')
