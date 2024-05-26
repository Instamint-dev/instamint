// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import RequestsChangeNft from '#models/requests_change_nft'
import NotificationService from '#services/notification_service'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'

export default class RequestsChangeNftsController {
  async exchangeNFT(ctx: HttpContext) {
    const { nftIdExchange, nftId } = ctx.request.only(['nftId', 'nftIdExchange'])

    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const ifExist = await db
      .from('requests_change_nfts')
      .where('nft_id', nftId)
      .where('nft_id_minter_would', nftIdExchange)
      .where('minter_requester_id', user.id)
      .where('is_approved', 2)

    if (ifExist.length > 0) {
      return ctx.response.json({ status: false, message: 'Request already sent' })
    }

    const USER_HAVE_NFT = await db
      .from('have_nfts')
      .where('id_nft', nftIdExchange)
      .select('id_minter')

    await RequestsChangeNft.create({
      nft_id: nftId,
      nft_id_minter_would: nftIdExchange,
      minter_requester_id: user.id,
      minter_received_id: USER_HAVE_NFT[0]['id_minter'],
      is_approved: 2,
    })

    const userIdHaveNft = await db
      .from('have_nfts')
      .where('id_nft', nftIdExchange)
      .select('id_minter')
    const userHaveNft = await User.find(userIdHaveNft[0]['id_minter'])

    if (!userHaveNft) {
      return ctx.response.status(404).json({ status: true, message: 'User not found' })
    }

    await NotificationService.createNotificationExchange(userHaveNft, 9, nftId, user)
    await NotificationService.createNotificationExchange(userHaveNft, 11, nftId, user)
    ctx.response.status(200).json({ status: true, message: 'Exchange request sent' })
  }

  async getRequestsChangeNftsReceived(ctx: HttpContext) {
    try {
      const user = ctx.auth.use('api').user

      if (!user) {
        return ctx.response.status(404).json({ status: false, message: 'User not found' })
      }

      const userNfts = await user.related('have_nft').query().select('id')

      if (!userNfts.length) {
        return ctx.response
          .status(404)
          .json({ status: false, message: 'No NFTs found for this user ' })
      }

      const requests = await db
        .from('requests_change_nfts as rcn')
        .leftJoin('users as minter', 'rcn.minter_requester_id', 'minter.id')
        .leftJoin('nfts', 'rcn.nft_id', 'nfts.id')
        .leftJoin('nfts as nfts_minter_would', 'rcn.nft_id_minter_would', 'nfts_minter_would.id')
        .where('rcn.minter_received_id', user.id)
        .select(
          'rcn.id',
          'rcn.is_approved',
          'nfts.id as nft_id',
          'nfts.link as nft_link',
          'nfts.image as nft_image',
          'nfts_minter_would.id as nft_id_minter_would',
          'nfts_minter_would.link as nft_link_minter_would',
          'nfts_minter_would.image as nft_image_minter_would',
          'minter.id as minter_id',
          'minter.username as minter_username',
          'minter.image as minter_image'
        )

      const formattedRequests = requests.map((request) => ({
        id: request.id,
        isApproved: request.is_approved,
        nftPropose: {
          id: request.nft_id,
          link: request.nft_link,
          image: request.nft_image,
        },
        nft_minter_would: {
          id: request.nft_id_minter_would,
          link: request.nft_link_minter_would,
          image: request.nft_image_minter_would,
        },
        minter: {
          id: request.minter_id,
          username: request.minter_username,
          image: request.minter_image,
        },
      }))

      return ctx.response.status(200).json({
        requestsExchangeNFT: formattedRequests,
        status: true,
        message: 'Requests found',
      })
    } catch (error) {
      return ctx.response
        .status(500)
        .json({ message: 'Error during exchange request ' + error, status: false })
    }
  }
  async getRequestsChangeNftsSent(ctx: HttpContext) {
    try {
      const user = ctx.auth.use('api').user

      if (!user) {
        return ctx.response.status(404).json({ status: false, message: 'User not found' })
      }

      const requests = await db
        .from('requests_change_nfts as rcn')
        .leftJoin('users as minter', 'rcn.minter_requester_id', 'minter.id')
        .leftJoin('nfts', 'rcn.nft_id', 'nfts.id')
        .leftJoin('nfts as nfts_minter_would', 'rcn.nft_id_minter_would', 'nfts_minter_would.id')
        .where('rcn.minter_requester_id', user.id)
        .select(
          'rcn.id',
          'rcn.is_approved',
          'nfts.id as nft_id',
          'nfts.link as nft_link',
          'nfts.image as nft_image',
          'nfts_minter_would.id as nft_id_minter_would',
          'nfts_minter_would.link as nft_link_minter_would',
          'nfts_minter_would.image as nft_image_minter_would',
          'minter.id as minter_id',
          'minter.username as minter_username',
          'minter.image as minter_image'
        )

      const formattedRequests = requests.map((request) => ({
        id: request.id,
        isApproved: request.is_approved,
        nftPropose: {
          id: request.nft_id,
          link: request.nft_link,
          image: request.nft_image,
        },
        nft_minter_would: {
          id: request.nft_id_minter_would,
          link: request.nft_link_minter_would,
          image: request.nft_image_minter_would,
        },
        minter: {
          id: request.minter_id,
          username: request.minter_username,
          image: request.minter_image,
        },
      }))

      return ctx.response.status(200).json({
        requestsExchangeNFT: formattedRequests,
        status: true,
        message: 'Requests found',
      })
    } catch (error) {
      return ctx.response
        .status(500)
        .json({ message: 'Error during exchange request ' + error, status: false })
    }
  }

  async changeStatusRequest(ctx: HttpContext) {
    try {
      const { requestId, isApproved } = ctx.request.only(['requestId', 'isApproved'])
      const user = ctx.auth.use('api').user

      if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }

      const request = await RequestsChangeNft.find(requestId)

      if (!request) {
        return ctx.response.status(404).json({ message: 'Request not found' })
      }

      request.is_approved = isApproved
      await request.save()

      const userIdHaveNft = await db
        .from('have_nfts')
        .where('id_nft', request.nft_id)
        .select('id_minter')
      const userHaveNft = await User.find(userIdHaveNft[0]['id_minter'])

      if (!userHaveNft) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }

      if (isApproved === 1) {
        await db
          .from('have_nfts')
          .where('id_nft', request.nft_id_minter_would)
          .where('id_minter', user.id)
          .update({ id_nft: request.nft_id })

        await db
          .from('have_nfts')
          .where('id_nft', request.nft_id)
          .where('id_minter', request.minter_requester_id)
          .update({ id_nft: request.nft_id_minter_would })

        await NotificationService.createNotificationExchange(
          user,
          10,
          request.nft_id_minter_would,
          userHaveNft
        )
        await NotificationService.createNotificationExchange(
          user,
          12,
          request.nft_id_minter_would,
          userHaveNft
        )
      } else if (isApproved === 0) {
        await NotificationService.createNotificationExchange(
          user,
          13,
          request.nft_id_minter_would,
          userHaveNft
        )
        await NotificationService.createNotificationExchange(
          user,
          14,
          request.nft_id_minter_would,
          userHaveNft
        )
      }

      return ctx.response.status(200).json({ message: 'Request updated' })
    } catch (error) {
      return ctx.response.status(500).json({ message: 'Error during exchange request ' + error })
    }
  }

  async deleteRequestExchange(ctx: HttpContext) {
    const { requestId } = ctx.request.only(['requestId'])
    try {
      const user = ctx.auth.use('api').user

      if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }

      const request = await RequestsChangeNft.find(requestId)

      if (!request) {
        return ctx.response.status(404).json({ message: 'Request not found' })
      }

      if (request.minter_requester_id !== user.id) {
        return ctx.response
          .status(403)
          .json({ message: 'You are not allowed to delete this request' })
      }

      await request.delete()
      return ctx.response.status(200).json({ message: 'Request deleted' })
    } catch (error) {
      return ctx.response.status(500).json({ message: 'Error during exchange request ' + error })
    }
  }
}
