/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthMiddleware from "#middleware/auth_middleware";

// router.on('/').render('pages/home')

router.post('/register', 'AuthController.register')
  .middleware(new AuthMiddleware().handle.bind(new AuthMiddleware()))
