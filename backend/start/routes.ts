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
router.post('/getUser', '#controllers/socials_controller.getUser')
router.post('/searchNFT', '#controllers/nft_controller.searchNFT')
router.post('/getCommentsNFT', '#controllers/nft_post_controller.getCommentsNFT')
router.post('/getNFTsFeed', '#controllers/nft_post_controller.getNFTsFeed')
router.post('/getDraftNFT', '#controllers/nft_controller.getDraftNFT')
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
    router.post('/updateDraftNFT', '#controllers/nft_controller.updateDraftNFT')
    router.post('/getDraftsCompleted', '#controllers/nft_post_controller.getDraftsCompleted')
    router.post('/getDraftsPost', '#controllers/nft_post_controller.getDraftsPost')
    router.post('/likeNFT', '#controllers/nft_post_controller.likeNFT')
    router.post('/ifUserLikedNFT', '#controllers/nft_controller.ifUserLikedNFT')
    router.post('/compareImages', '#controllers/nft_post_controller.compareImages')
    router.post('/addCommentNFT', '#controllers/nft_post_controller.addCommentNFT')
    router.post('/deleteCommentNFT', '#controllers/nft_post_controller.deleteCommentNFT')
    router.post('/followInformations', '#controllers/socials_controller.followInformations')
    router.post('/followUser', '#controllers/socials_controller.followUser')
    router.post('/getNotifications', '#controllers/notifications_controller.index')
    router.post('/checkIsLogin', '#controllers/auth_controller.checkIsLogin')
    router.post('/isFollowPrivate', '#controllers/socials_controller.isFollowPrivate')
    router.post('/getNFTSFeedFollow', '#controllers/nft_post_controller.getNFTSFeedFollow')
  })
  .use([
    middleware.auth({
      guards: ['api'],
    }),
  ])
router.post('/searchNFT', '#controllers/nft_controller.searchNFT')
router.post('/getCommentsNFT', '#controllers/nft_post_controller.getCommentsNFT')
router.post('/getNFTsFeed', '#controllers/nft_post_controller.getNFTsFeed')
