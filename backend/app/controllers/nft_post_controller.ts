import { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'
import db from '@adonisjs/lucid/services/db'
import CommentariesPostType from '#controllers/type/commentaries_post_type'
import Commentary from '#models/commentary'
import User from '#models/user'
import axios from 'axios'

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

    const nftIds = await user.related('have_nft').query().select('id')
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

    if (isLiked) {
      await nft.related('userLike').detach([user.id])

      return ctx.response.status(200).json({ message: 'Like removed successfully' })
    } else {
      await nft.related('userLike').attach([user.id])

      return ctx.response.status(200).json({ message: 'Like added successfully' })
    }
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
    const { idNFT, message, idParentCommentary } = ctx.request.only([
      'idNFT',
      'message',
      'idParentCommentary',
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

          const comments = await db
            .from('commentaries')
            .where('id_nft', nft.id)
            .select('*')
            .innerJoin('users', 'users.id', 'users.username')

          const minterInfo = await db
            .from('have_nfts')
            .where('id_nft', nft.id)
            .select('id_minter')
            .first()

          const minter = await User.find(minterInfo.id_minter)

          if (!minter) {
            return ctx.response.status(404).json({ message: 'Minter not found' })
          }

          const numberOfLikes = likeCount['count(*)']

          return {
            nft: nft.toJSON(),
            username: minter.username,
            mint: numberOfLikes,
            comments: comments.map((comment) => ({
              id: comment.id,
              text: comment.text,
              user: {
                id: comment.user_id,
                username: comment.username,
              },
            })),
          }
        })
      )
      return ctx.response.status(200).json(nftsWithDetails)
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
}
