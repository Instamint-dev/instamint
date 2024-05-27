import { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'
import db from '@adonisjs/lucid/services/db'
import CommentariesPostType from '#controllers/type/commentaries_post_type'
import Commentary from '#models/commentary'
import User from '#models/user'
import axios from 'axios'
import NotificationService from '#services/notification_service'
import Notification from '#models/notification'

export default class NftPostController {
  async getDraftsCompleted(ctx: HttpContext) {
    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const nftIds = await user.related('have_nft').query().select('id')
    const listNft = await Nft.query().whereIn(
      'id',
      nftIds.map((nft) => nft.id)
    )
    const nfts = listNft.filter((nft) => {
      return (
        nft.description &&
        nft.image &&
        nft.link &&
        nft.place &&
        nft.hashtags &&
        Number(nft.draft) === 1
      )
    })

    return ctx.response.status(200).json({ nfts })
  }

  async getDraftsPost(ctx: HttpContext) {
    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }
    const { link } = ctx.request.only(['link'])
    let nftIds = await user.related('have_nft').query().select('id')

    if (link !== undefined) {
      const USER_WITH_LINK = await User.findBy('link', link)
      if (USER_WITH_LINK) {
        nftIds = await USER_WITH_LINK.related('have_nft').query().select('id')
      }
    }

    const listNft = await Nft.query().whereIn(
      'id',
      nftIds.map((nft) => nft.id)
    )
    const nfts = listNft.filter((nft) => {
      return nft.description && nft.image && nft.place && nft.hashtags && Number(nft.draft) === 0
    })

    return ctx.response.status(200).json({ nfts })
  }

  async likeNFT(ctx: HttpContext) {
    const { idNFT } = ctx.request.only(['idNFT'])
    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const nft = await Nft.find(idNFT)

    if (!nft) {
      return ctx.response.status(404).json({ message: false })
    }

    const isLiked = await nft.related('userLike').query().where('id_minter', user.id).first()
    const ownerId = await db.from('have_nfts').select('id_minter').where('id_nft', idNFT).first()
    const USER_EXIST = await User.find(ownerId.id_minter)
    if (!USER_EXIST) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }
    if (isLiked) {
      const USER_LOGIN = await User.find(ownerId.id_minter)
      if (!USER_LOGIN) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }
      await nft.related('userLike').detach([user.id])
      await this.deleteNotification(USER_EXIST, nft, 4)

      return ctx.response.status(200).json({ message: 'Like removed successfully' })
    } else {
      await nft.related('userLike').attach([user.id])
      await NotificationService.createNotification(USER_EXIST, 4, nft.id)

      return ctx.response.status(200).json({ message: 'Like added successfully' })
    }
  }

  private async deleteNotification(USER_EXIST: User, NFT: Nft, type: number) {
    await Notification.query()
      .where('user_id', USER_EXIST.id)
      .andWhere('link', NFT.id)
      .andWhere('type', type)
      .delete()
  }

  async countLikeNFT(ctx: HttpContext) {
    const { idNFT } = ctx.request.only(['idNFT'])
    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const nft = await Nft.find(idNFT)

    if (!nft) {
      return ctx.response.status(404).json({ message: false })
    }

    return ctx.response.status(200).json({ message: false })
  }

  async getCommentsNFT(ctx: HttpContext) {
    const { idNFT } = ctx.request.only(['idNFT'])

    const nft = await Nft.find(idNFT)

    if (!nft) {
      return ctx.response.status(404).json({ message: false })
    }

    const comments: CommentariesPostType[] = await db
      .from('commentaries')
      .where('id_nft', nft.id)
      .leftJoin('users', 'commentaries.id_minter', 'users.id')
      .select(
        'commentaries.message',
        'commentaries.id',
        'commentaries.date',
        'commentaries.id_parent_commentary',
        'users.username',
        'users.image'
      )

    return ctx.response.status(200).json({ comments })
  }

  async addCommentNFT(ctx: HttpContext) {
    const { idNFT, message, idParentCommentary, mentions } = ctx.request.only([
      'idNFT',
      'message',
      'idParentCommentary',
      'mentions',
    ])
    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    await Commentary.create({
      message: message,
      id_minter: user.id,
      id_nft: idNFT,
      id_parent_commentary: idParentCommentary,
      date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    })

    const ownerId = await db.from('have_nfts').select('id_minter').where('id_nft', idNFT).first()
    const USER_EXIST = await User.find(ownerId.id_minter)
    if (!USER_EXIST) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    await NotificationService.createNotification(USER_EXIST, 5, idNFT)

    if (mentions && mentions.length > 0) {
      for (const mentionedUserId of mentions) {
        const mentionedUser = await User.findBy('username', mentionedUserId)
        if (mentionedUser) {
          await NotificationService.createNotification(mentionedUser, 6, idNFT)
        }
      }
    }

    return ctx.response.status(200).json({ message: 'Comment added successfully' })
  }

  async getNFTsFeed(ctx: HttpContext) {
    try {
      const nfts = await Nft.query()
        .select('id', 'description', 'image', 'link', 'place', 'hashtags', 'price')
        .where('draft', 0)
        .exec()

      const nftsWithDetails = await Promise.all(
        nfts.map(async (nft) => {
          const likeCount = await db.from('like_nfts').where('id_nft', nft.id).count('*').first()

          const nftCountInHaveNfts = await db
            .from('have_nfts')
            .where('id_nft', nft.id)
            .count('*')
            .first()
          const numberOfNftInHaveNfts = nftCountInHaveNfts['count(*)']

          if (numberOfNftInHaveNfts > 1) {
            return false
          }

          const minterInfo = await db
            .from('have_nfts')
            .where('id_nft', nft.id)
            .select('id_minter')
            .first()

          const minter = await User.find(minterInfo.id_minter)

          if (!minter) {
            return false
          }

          const ifFollow = await db
            .from('followers')
            .where('follower', minter.id)
            .count('*')
            .first()

          if (minter.status === 'private' && ifFollow['count(*)'] === 0) {
            return false
          }

          const numberOfLikes = likeCount['count(*)']

          return {
            nft: nft.toJSON(),
            username: minter.username,
            mint: numberOfLikes,
          }
        })
      )

      const filteredNftsWithDetails = nftsWithDetails.filter((nft) => nft !== false)

      return ctx.response.status(200).json(filteredNftsWithDetails)
    } catch (error) {
      return ctx.response.status(500).json({ message: 'Internal Server Error' })
    }
  }
  async getNFTSFeedFollow(ctx: HttpContext) {
    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    try {
      const followers = await db.from('followers').where('follower', user.id).select('followed')

      const haveNfts = await db
        .from('have_nfts')
        .select('id_nft')
        .whereIn(
          'id_minter',
          followers.map((follower) => follower.followed)
        )

      const nfts = await Nft.query()
        .whereIn(
          'id',
          haveNfts.map((haveNft) => haveNft.id_nft)
        )
        .select('id', 'description', 'image', 'link', 'place', 'hashtags', 'price')
        .exec()

      const nftsWithDetails = await Promise.all(
        nfts.map(async (nft) => {
          const likeCount = await db.from('like_nfts').where('id_nft', nft.id).count('*').first()

          const minterInfo = await db
            .from('have_nfts')
            .where('id_nft', nft.id)
            .select('id_minter')
            .first()

          const minter = await User.find(minterInfo.id_minter)

          if (!minter) {
            return false
          }

          const numberOfLikes = likeCount['count(*)']

          return {
            nft: nft.toJSON(),
            username: minter.username,
            mint: numberOfLikes,
          }
        })
      )

      const filteredNftsWithDetails = nftsWithDetails.filter((nft) => nft !== false)
      return ctx.response.status(200).json(filteredNftsWithDetails)
    } catch (error) {
      return ctx.response.status(500).json({ message: 'Internal Server Error' })
    }
  }
  async compareImages(ctx: HttpContext) {
    const { imageBase } = ctx.request.only(['imageBase'])
    const nfts = await Nft.query().where('draft', 0).exec()
    try {
      const image1Response = await axios.get(imageBase, { responseType: 'arraybuffer' })
      const image1Base64 = Buffer.from(image1Response.data, 'binary').toString('base64')

      const comparisonResults = await Promise.all(
        nfts.map(async (nft) => {
          const nftImage2 = await axios.get(nft.image, { responseType: 'arraybuffer' })
          const nftImageBase64 = Buffer.from(nftImage2.data, 'binary').toString('base64')
          const isEqual = image1Base64 === nftImageBase64

          return { nftId: nft.image, isEqual }
        })
      )

      const hasSimilarImage = comparisonResults.every((result) => !result.isEqual)

      return ctx.response.status(200).json(hasSimilarImage)
    } catch (error) {
      return ctx.response.status(500).json({ error: 'Error while comparing images' })
    }
  }

  async deleteCommentNFT(ctx: HttpContext) {
    const { idComment } = ctx.request.only(['idComment'])
    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const comment = await Commentary.find(idComment)
    if (!comment) {
      return ctx.response.status(404).json({ message: 'Comment not found' })
    }

    const nft = await Nft.find(comment.id_nft)

    if (!nft) {
      return ctx.response.status(404).json({ message: 'NFT not found' })
    }

    const ownerId = await db
      .from('have_nfts')
      .select('id_minter')
      .where('id_nft', comment.id_nft)
      .first()

    const USER_EXIST = await User.find(ownerId.id_minter)

    if (!USER_EXIST) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    await this.deleteNotification(USER_EXIST, nft, 5)

    if (!comment) {
      return ctx.response.status(404).json({ message: 'Comment not found' })
    }

    if (comment.id_minter !== user.id) {
      return ctx.response
        .status(403)
        .json({ message: 'You are not allowed to delete this comment' })
    }

    await comment.delete()

    return ctx.response.status(200).json({ message: 'Comment deleted successfully' })
  }

  async verifyCookPostNft(ctx: HttpContext) {
    const { link } = ctx.request.only(['link'])
    const nft = await Nft.findBy('link', link)

    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    if (!nft) {
      return ctx.response.status(404).json({ message: false })
    }
    const count = await db.from('have_nfts').where('id_nft', nft.id).count('* as count')

    if (count[0].count === 1) {
      return ctx.response.status(200).json(false)
    } else if (count[0].count > 1) {
      const haveNfts = await db.from('have_nfts').select('id_minter').where('id_nft', nft.id)
      const teaBagIds = await db
        .from('tea_bags')
        .select('id')
        .whereIn(
          'id',
          haveNfts.map((entry) => entry.id_minter)
        )

      const response = await db
        .from('tea_bags')
        .where('id', teaBagIds[0].id)
        .whereRaw('JSON_CONTAINS(cook, CAST(? AS JSON))', [user.id])
      const ifCook = response.length > 0

      return ctx.response.status(200).json(ifCook)
    }
  }
}
