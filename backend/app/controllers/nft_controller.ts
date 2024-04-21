  import {HttpContext} from "@adonisjs/core/http"
  import User from "#models/user"
  import Nft from "#models/nft"
  import {generateRandomImageName, uploadBase64ImageToAzureStorage} from "#controllers/user_controller" // Importer la fonction

  export default class NFTController {

    async registerDraftNFT(ctx: HttpContext) {
      const accountName = process.env.AZURE_ACCOUNT_NAME || ''
      const accountKey = process.env.AZURE_ACCOUNT_KEY || ''
      const containerName = process.env.AZURE_CONTAINER_NFT || ''

      const { username, description, image, link, place, draft,hashtags } = ctx.request.only([
        'username',
        'description',
        'image',
        'link',
        'place',
        'draft',
        'hashtags',
      ])

      const user = await User.findBy('username', username)

      if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }

      const UrlImage = await uploadBase64ImageToAzureStorage(image, generateRandomImageName(), accountName, accountKey, containerName)

      const nft = new Nft()
      nft.description = description
      nft.image = UrlImage
      nft.link = link
      nft.place = place
      nft.draft = draft
      nft.hashtags = hashtags


      await nft.save()
      await user.related('have_nft').attach([nft.id])

      return ctx.response.status(200).json({ message: 'NFT registered' })
    }

    async getNFTsByUser(ctx: HttpContext) {
      const { username } = ctx.request.only(['username'])
      const user = await User.findBy('username', username)

      if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }

      const nftIds = await user.related('have_nft').query().select('id')
      const nfts = await Nft.query().whereIn('id', nftIds.map((nft) => nft.id))
      return ctx.response.status(200).json({ nfts })
    }
  }
