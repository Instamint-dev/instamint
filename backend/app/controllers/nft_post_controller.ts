import { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'


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
      console.log("likeNFT")
        const {  id_nft } = ctx.request.only([ 'id_nft'])
        const user = ctx.auth.use('api').user

        if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
        }

        const nft = await Nft.find(id_nft)

        if (!nft) {
        return ctx.response.status(404).json({ message: false })
        }

        // console.log(user.id+" "+nft.id)

        // await user.related('like_nft').attach([nft.id])

      // await nft.related('like_nfts').attach([user.id])
      //   await nft.related('userLike').attach([user.id])

        // const likedNfts = await user.related('like_nft').query().select('id').count('*').groupBy("id").where('id_nft', id_nft)

      // const likeNfts=Database.from('like_nfts').count('*').where('id_nft', 1)



      console.log(likeNfts)


      // await nft.related('user').attach([user.id])


        return ctx.response.status(200).json({ message: true })
    }

  // async likeNFT(ctx: HttpContext) {
  //   const { id_nft } = ctx.request.only(['id_nft']);
  //
  //   // Compter le nombre de fois que le NFT est aimé
  //   // const likeCount = await Database.from('like_nfts').count('*').where('id_nft', id_nft);
  //
  //   return ctx.response.status(200).json({ likeCount });
  // }
}
