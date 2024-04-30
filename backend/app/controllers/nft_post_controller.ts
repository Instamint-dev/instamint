import { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'
import db from "@adonisjs/lucid/services/db";
import CommentariesPost from "#controllers/type/CommentariesPost";



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
    const { id_nft } = ctx.request.only(['id_nft'])
    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const nft = await Nft.find(id_nft)

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
        const {  id_nft } = ctx.request.only([ 'id_nft'])
        const user = ctx.auth.use('api').user

        if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
        }

        const nft = await Nft.find(id_nft)

        if (!nft) {
        return ctx.response.status(404).json({ message: false })
        }


        return ctx.response.status(200).json({ message:false })
    }

    async getCommentsNFT(ctx: HttpContext) {
        const { id_nft } = ctx.request.only(['id_nft'])


        const nft = await Nft.find(id_nft)

        if (!nft) {
        return ctx.response.status(404).json({ message: false })
        }

        console.log(nft)

        // const comments = await nft.related('commentary').query().select('id', 'comment', 'created_at').orderBy('created_at', 'desc')

      const comments: CommentariesPost[] = await db
        .from('commentaries')
        .where('id_nft', nft.id)
        .leftJoin('users', 'commentaries.id_minter', 'users.id') // Jointure avec la table des utilisateurs
        .select('commentaries.message', 'commentaries.date', 'commentaries.id_parent_commentary', 'users.username','users.image'); // Sélection des champs nécessaires sans id_minter



      console.log(comments)

        return ctx.response.status(200).json({ comments })
    }




}



