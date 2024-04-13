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
