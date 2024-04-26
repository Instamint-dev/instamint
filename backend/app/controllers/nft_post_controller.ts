import {HttpContext} from "@adonisjs/core/http";
import Nft from "#models/nft";

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
         return nft.description && nft.image && nft.link && nft.place && nft.hashtags
      });
        console.log(nfts)
      return ctx.response.status(200).json({ nfts })
  }
}
