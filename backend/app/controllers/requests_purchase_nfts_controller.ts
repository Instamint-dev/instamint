// import type { HttpContext } from '@adonisjs/core/http'

import RequestsPurchaseNft from '#models/requests_purchase_nft'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import NotificationService from '#services/notification_service'
import User from '#models/user'

export default class RequestsPurchaseNftsController {
  async makeRequestPurchase(ctx: HttpContext) {
    const { nftId, price } = ctx.request.body()

    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }
    const userHaveNFTRecords = await db.from('have_nfts').where('id_nft', nftId).select('id_minter')

    const idUserHaveNFT = userHaveNFTRecords[0]['id_minter']

    const UserHaveNFT = await User.find(idUserHaveNFT)

    if (!UserHaveNFT) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    await RequestsPurchaseNft.create({
      nft_id: nftId,
      buyer_id: user.id,
      seller_id: idUserHaveNFT,
      price: price,
      is_approved: 2,
    })
    await NotificationService.createNotificationPurchase(UserHaveNFT, 15, nftId, user)
    await NotificationService.createNotificationPurchase(UserHaveNFT, 16, nftId, user)
    return ctx.response.status(200).json({ message: 'Request sent' })
  }

  async getRequestsPurchaseNftsReceived(ctx: HttpContext) {
    try {
      const user = ctx.auth.use('api').user

      if (!user) {
        return ctx.response.status(404).json({ status: false, message: 'User not found' })
      }

      // Checking if the user owns any NFTs
      const userNfts = await user.related('have_nft').query().select('id')

      if (!userNfts.length) {
        return ctx.response
          .status(404)
          .json({ status: false, message: 'No NFTs found for this user' })
      }

      // Fetching purchase requests where the current user is the seller
      const requests = await db
        .from('requests_purchase_nfts as rpn')
        .leftJoin('users as buyer', 'rpn.buyer_id', 'buyer.id')
        .leftJoin('nfts', 'rpn.nft_id', 'nfts.id')
        .leftJoin('users as seller', 'rpn.seller_id', 'seller.id')
        .where('rpn.seller_id', user.id)
        .select(
          'rpn.is_approved',
          'rpn.id',
          'rpn.price',
          'nfts.id as nft_id',
          'nfts.link as nft_link',
          'nfts.image as nft_image',
          'buyer.id as buyer_id',
          'buyer.username as buyer_username',
          'buyer.image as buyer_image',
          'seller.username as seller_username'
        )

      const formattedRequests = requests.map((request) => ({
        id: request.id,
        seller: {
          username: request.seller_username,
        },
        buyer: {
          id: request.buyer_id,
          username: request.buyer_username,
          image: request.buyer_image,
        },
        nft: {
          id: request.nft_id,
          link: request.nft_link,
          image: request.nft_image,
        },
        price: request.price,
        is_approved: request.is_approved,
      }))

      return ctx.response.status(200).json({
        requestsPurchaseNFT: formattedRequests,
        status: true,
        message: 'Purchase requests found',
      })
    } catch (error) {
      return ctx.response
        .status(500)
        .json({ message: 'Error during purchase request processing: ' + error, status: false })
    }
  }

  async getRequestsPurchaseNftsSent(ctx: HttpContext) {
    try {
      const user = ctx.auth.use('api').user

      if (!user) {
        return ctx.response.status(404).json({ status: false, message: 'User not found' })
      }

      // Checking if the user owns any NFTs
      const userNfts = await user.related('have_nft').query().select('id')

      if (!userNfts.length) {
        return ctx.response
          .status(404)
          .json({ status: false, message: 'No NFTs found for this user' })
      }

      // Fetching purchase requests where the current user is the buyer
      const requests = await db
        .from('requests_purchase_nfts as rpn')
        .leftJoin('users as buyer', 'rpn.buyer_id', 'buyer.id')
        .leftJoin('users as seller', 'rpn.seller_id', 'seller.id')
        .leftJoin('nfts', 'rpn.nft_id', 'nfts.id')
        .where('rpn.buyer_id', user.id)
        .select(
          'rpn.id',
          'rpn.price',
          'rpn.is_approved',
          'nfts.id as nft_id',
          'nfts.link as nft_link',
          'nfts.image as nft_image',
          'buyer.id as buyer_id',
          'buyer.username as buyer_username',
          'buyer.image as buyer_image',
          'seller.username as seller_username'
        )

      const formattedRequests = requests.map((request) => ({
        id: request.id,
        seller: {
          username: request.seller_username,
        },
        buyer: {
          id: request.buyer_id,
          username: request.buyer_username,
          image: request.buyer_image,
        },
        nft: {
          id: request.nft_id,
          link: request.nft_link,
          image: request.nft_image,
        },
        price: request.price,
        is_approved: request.is_approved,
      }))

      return ctx.response.status(200).json({
        requestsPurchaseNFT: formattedRequests,
        status: true,
        message: 'Purchase requests found',
      })
    } catch (error) {
      return ctx.response
        .status(500)
        .json({ message: 'Error during purchase request processing: ' + error, status: false })
    }
  }

  async changeStatusRequestPurchase(ctx: HttpContext) {
    const { requestId, isApproved } = ctx.request.only(['requestId', 'isApproved'])
    console.log(isApproved)
    try {
      const user = ctx.auth.use('api').user

      if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }

      const request = await RequestsPurchaseNft.find(requestId)

      if (!request) {
        return ctx.response.status(404).json({ message: 'Request not found' })
      }

      if (request.seller_id !== user.id) {
        return ctx.response
          .status(403)
          .json({ message: 'You are not allowed to change the status of this request' })
      }

      request.is_approved = isApproved
      await request.save()

      const userBuyer = await User.find(request.buyer_id)

      if (!userBuyer) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }

      if (isApproved === 1) {
        await db
          .from('have_nfts')
          .where('id_nft', request.nft_id)
          .update('id_minter', request.buyer_id)
        await NotificationService.createNotificationPurchase(user, 17, request.nft_id, userBuyer)
        await NotificationService.createNotificationPurchase(user, 18, request.nft_id, userBuyer)
      } else if (isApproved === 0) {
        await NotificationService.createNotificationPurchase(user, 19, request.nft_id, userBuyer)
        await NotificationService.createNotificationPurchase(user, 20, request.nft_id, userBuyer)
      }
    } catch (error) {
      return ctx.response
        .status(500)
        .json({ message: 'Error during request status change: ' + error })
    }

    return ctx.response.status(200).json({ message: 'Request status changed' })
  }
}
