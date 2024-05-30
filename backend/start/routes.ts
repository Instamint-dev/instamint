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
router.post('/getDefaultData', '#controllers/searches_controller.getDefaultData')
router.post('/search', '#controllers/searches_controller.search')
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
    router.post('/deleteNotification', '#controllers/notifications_controller.deleteNotification')
    router.post('/checkIsLogin', '#controllers/auth_controller.checkIsLogin')
    router.post('/isFollowPrivate', '#controllers/socials_controller.isFollowPrivate')
    router.post('/getNFTSFeedFollow', '#controllers/nft_post_controller.getNFTSFeedFollow')
    router.post('/createTeaBag', '#controllers/teabags_controller.createTeaBag')
    router.post('/getTeaBags', '#controllers/teabags_controller.getTeaBags')
    router.post('/getMyTeaBags', '#controllers/teabags_controller.getMyTeaBags')
    router.post('/updateTeaBag', '#controllers/teabags_controller.updateTeaBag')
    router.post('/verifyCookPostNft', '#controllers/nft_post_controller.verifyCookPostNft')
    router.post('/deleteUser', '#controllers/user_controller.deleteUser')
    router.post('/joinTeaBag', '#controllers/socials_controller.joinTeaBag')
    router.post('/followUserTeaBag', '#controllers/socials_controller.followUserTeaBag')
    router.post('/getListMessages', '#controllers/messages_controller.getListMessages')
    router.post('/getMessageWithUser', '#controllers/messages_controller.getMessageWithUser')
    router.post('/sendMessage', '#controllers/messages_controller.sendMessage')
    router.post('/searchUserMessage', '#controllers/searches_controller.searchUserMessage')
    router.post('/getEmojis', '#controllers/emojis_controller.getEmojis')
    router.post('/addReport', '#controllers/reports_controller.addReport')
    router.post(
      '/getSettingNotification',
      '#controllers/notifications_controller.getSettingNotification'
    )
    router.post(
      '/updateSettingNotification',
      '#controllers/notifications_controller.updateSettingNotification'
    )
    router.post('/getMyLink', '#controllers/socials_controller.getMyLink')
    router.post('/exchangeNFT', '#controllers/requests_change_nfts_controller.exchangeNFT')
    router.post(
      '/getRequestsChangeNfts',
      '#controllers/requests_change_nfts_controller.getRequestsChangeNftsReceived'
    )
    router.post(
      '/getRequestsChangeNftsSent',
      '#controllers/requests_change_nfts_controller.getRequestsChangeNftsSent'
    )
    router.post(
      '/changeStatusRequest',
      '#controllers/requests_change_nfts_controller.changeStatusRequest'
    )
    router.post(
      '/makeRequestPurchase',
      '#controllers/requests_purchase_nfts_controller.makeRequestPurchase'
    )
    router.post(
      '/getRequestsPurchaseNftsReceived',
      '#controllers/requests_purchase_nfts_controller.getRequestsPurchaseNftsReceived'
    )
    router.post(
      '/getRequestsPurchaseNftsSent',
      '#controllers/requests_purchase_nfts_controller.getRequestsPurchaseNftsSent'
    )
    router.post(
      '/changeStatusRequestPurchase',
      '#controllers/requests_purchase_nfts_controller.changeStatusRequestPurchase'
    )
    router.post(
      '/deleteRequestPurchase',
      '#controllers/requests_purchase_nfts_controller.deleteRequestPurchase'
    )
    router.post(
      '/deleteRequestExchange',
      '#controllers/requests_change_nfts_controller.deleteRequestExchange'
    )
    router.post('/deleteSoftUser', '#controllers/user_controller.deleteSoftUser')
    router.post('/saveLang', '#controllers/user_controller.saveLang')
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
    router.post('/disconnect', '#controllers/admin/view_admin_controller.disconnect')
    router.post('/nfts.delete', '#controllers/admin/admin_controller.deleteNfts')
    router.post('/teabags.delete', '#controllers/admin/admin_controller.deleteTeaBag')
    router.post('/minters.delete', '#controllers/admin/admin_controller.deleteMinter')
    router.post('/minters.disable', '#controllers/admin/admin_controller.disableMinter')
  // router.group(() => {

    
    

  // })
  // .use(
  //   [
  //     middleware.admin({
  //       guards:["api_admin"],
  //     })
  //   ])
export default router