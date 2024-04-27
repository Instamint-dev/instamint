import { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'
import {
  deleteImage,
  generateRandomImageName,
  uploadBase64ImageToAzureStorage,
} from '#controllers/user_controller'
import env from '#start/env'

export default class NFTController {
  protected async registerDraftNFT(ctx: HttpContext) {
    const accountName = env.get('AZURE_ACCOUNT_NAME') || ''
    const accountKey = env.get('AZURE_ACCOUNT_KEY') || ''
    const containerName = env.get('AZURE_CONTAINER_NFT') || ''

    const { description, image, place, draft, hashtags } = ctx.request.only([
      'description',
      'image',
      'place',
      'draft',
      'hashtags',
    ])

    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const UrlImage = await uploadBase64ImageToAzureStorage(
      image,
      generateRandomImageName(),
      accountName,
      accountKey,
      containerName
    )

    const nft = new Nft()
    nft.description = description
    nft.image = UrlImage


    nft.place = place
    nft.draft = draft
    nft.hashtags = hashtags
    const parts = UrlImage.split("/");
    const linkWithExtension = parts[parts.length - 1];
    nft.link= linkWithExtension.split(".")[0];

    await nft.save()
    await user.related('have_nft').attach([nft.id])

    return ctx.response.status(200).json({ message: 'NFTPost registered' })
  }

  async getNFTsByUserDraft(ctx: HttpContext) {
    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const nftIds = await user.related('have_nft').query().select('id')
    const draftNfts = await Nft.query().whereIn(
      'id',
      nftIds.map((nft) => nft.id)
    )

    const nfts = draftNfts.filter(nft => Number(nft.draft) === 1);

    return ctx.response.status(200).json({ nfts })
  }

  async deleteDraftNFT(ctx: HttpContext) {
    const { id } = ctx.request.only(['id'])
    const nft = await Nft.find(id)

    const accountName = process.env.AZURE_ACCOUNT_NAME || ''
    const accountKey = process.env.AZURE_ACCOUNT_KEY || ''
    const containerName = process.env.AZURE_CONTAINER_NFT || ''

    if (!nft) {
      return ctx.response.status(404).json({ message: 'NFTPost not found' })
    }

    await deleteImage(nft.image, accountName, accountKey, containerName)

    await nft.delete()
    return ctx.response.status(200).json({ message: 'NFTPost deleted' })
  }

  async getDraftNFT(ctx: HttpContext) {
    const { id } = ctx.request.only(['id'])
    const nft = await Nft.find(id)

    if (!nft) {
      return ctx.response.status(404).json({ message: 'NFTPost not found' })
    }

    return ctx.response.status(200).json({ nft })
  }

  async updateDraftNFT(ctx: HttpContext) {
    const accountName = process.env.AZURE_ACCOUNT_NAME || ''
    const accountKey = process.env.AZURE_ACCOUNT_KEY || ''
    const containerName = process.env.AZURE_CONTAINER_NFT || ''

    const { id, description, image, link, place, draft, hashtags } = ctx.request.only([
      'id',
      'description',
      'image',
      'link',
      'place',
      'draft',
      'hashtags',
    ])

    const nft = await Nft.find(id)

    if (!nft) {
      return ctx.response.status(404).json({ message: 'NFTPost not found' })
    }

    if (image !== nft.image && nft.image) {
      await deleteImage(nft.image, accountName, accountKey, containerName)
      nft.image = await uploadBase64ImageToAzureStorage(
        image,
        generateRandomImageName(),
        accountName,
        accountKey,
        containerName
      )
    }

    nft.description = description
    nft.image = image
    nft.link = link
    nft.place = place
    nft.draft = draft
    nft.hashtags = hashtags

    await nft.save()

    return ctx.response.status(200).json({ message: 'NFTPost updated' })
  }

  async searchNFT(ctx: HttpContext) {
    const { search } = ctx.request.only(['search'])
    const nft = await Nft.findBy('link', search)
    if (!nft?.draft) {
      return ctx.response.status(200).json({ nft })
    } else {
      return ctx.response.status(404).json({ error: 'NFTPost not found' })
    }
  }
}
