import { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'
import db from '@adonisjs/lucid/services/db'
import CommentariesPostType from '#controllers/type/commentaries_post_type'
import Commentary from '#models/commentary'

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
}
