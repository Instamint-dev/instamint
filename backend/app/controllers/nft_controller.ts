import { HttpContext } from '@adonisjs/core/http'
import Nft from '#models/nft'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'
import { AZURE_ACCOUNT_KEY, AZURE_ACCOUNT_NAME, AZURE_CONTAINER_NFT } from '#services/azure_service'
import {
  deleteImage,
  generateRandomImageName,
  uploadBase64ImageToAzureStorage,
} from '#services/azure_service'
export default class NFTController {
  protected async registerDraftNFT(ctx: HttpContext) {
    const { description, image, place, draft, hashtags, price } = ctx.request.only([
      'description',
      'image',
      'place',
      'draft',
      'hashtags',
      'price',
    ])

    const user = ctx.auth.use('api').user

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const matches = image.match(/^data:image\/(\w+);base64,/)
    if (
      !matches ||
      matches[1] !== 'png' ||
      matches[1] !== 'webp' ||
      matches[1] !== 'ogg' ||
      matches[1] !== 'flac'
    ) {
      ctx.response.status(400).json({ message: 'Invalid base64 image string' })
    }
    const extension = matches[1]

    const UrlImage = await uploadBase64ImageToAzureStorage(
      image,
      generateRandomImageName(extension),
      AZURE_ACCOUNT_NAME,
      AZURE_ACCOUNT_KEY,
      AZURE_CONTAINER_NFT
    )

    const nft = new Nft()
    nft.description = description
    nft.image = UrlImage
    nft.price = price
    nft.place = place
    nft.draft = draft
    nft.hashtags = hashtags
    const parts = UrlImage.split('/')
    const linkWithExtension = parts[parts.length - 1]
    nft.link = linkWithExtension.split('.')[0]

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

    const nfts = draftNfts.filter((nft) => Number(nft.draft) === 1)

    return ctx.response.status(200).json({ nfts })
  }

  async deleteDraftNFT(ctx: HttpContext) {
    const { id } = ctx.request.only(['id'])
    const nft = await Nft.find(id)

    if (!nft) {
      return ctx.response.status(404).json({ message: 'NFTPost not found' })
    }

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
    const { formData, type } = ctx.request.only(['formData', 'type'])

    if (type === 0) {
      const nft = await Nft.find(formData.id)

      if (!nft) {
        return ctx.response.status(404).json({ message: 'NFTPost not found' })
      }

      if (formData.image !== nft.image && nft.image) {
        const matches = formData.image.match(/^data:image\/(\w+);base64,/)
        if (
          !matches ||
          matches[1] !== 'png' ||
          matches[1] !== 'webp' ||
          matches[1] !== 'ogg' ||
          matches[1] !== 'flac'
        ) {
          ctx.response.status(400).json({ message: 'Invalid base64 image string' })
        }
        const extension = matches[1]
        await deleteImage(nft.image, AZURE_ACCOUNT_NAME, AZURE_ACCOUNT_KEY, AZURE_CONTAINER_NFT)
        nft.image = await uploadBase64ImageToAzureStorage(
          formData.image,
          generateRandomImageName(extension),
          AZURE_ACCOUNT_NAME,
          AZURE_ACCOUNT_KEY,
          AZURE_CONTAINER_NFT
        )
      }

      nft.description = formData.description
      nft.link = formData.link
      nft.place = formData.place
      nft.draft = formData.draft
      nft.hashtags = formData.hashtags
      nft.price = formData.price

      await nft.save()
    } else {
      const nft = await Nft.find(formData.id)

      if (!nft) {
        return ctx.response.status(404).json({ message: 'NFTPost not found' })
      }

      nft.description = formData.description
      nft.image = formData.image
      nft.link = formData.link
      nft.place = formData.place
      nft.draft = formData.draft
      nft.hashtags = formData.hashtags
      nft.price = formData.price
      await nft.save()

      const user = await User.find(type)
      if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }
      await user.related('have_nft').attach([nft.id])
    }

    return ctx.response.status(200).json({ message: 'NFTPost updated' })
  }
  async searchNFT(ctx: HttpContext) {
    const { search } = ctx.request.only(['search'])
    const nft = await Nft.findBy('link', search)

    if (nft && !nft?.draft) {
      const likeCount = await db.from('like_nfts').where('id_nft', nft.id).count('*').first()
      const numberOfLikes = likeCount['count(*)']
      const idMinter = await db.from('have_nfts').where('id_nft', nft.id).select('id_minter')
      const user = await User.find(idMinter[0].id_minter)
      if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }

      return ctx.response
        .status(200)
        .json({ nft, username: user.username, mint: numberOfLikes, linkUser: user.link })
    } else {
      return ctx.response.status(404).json({ error: 'NFTPost not found' })
    }
  }
  async ifUserLikedNFT(ctx: HttpContext) {
    const user = ctx.auth.use('api').user
    const { idNFT } = ctx.request.only(['idNFT'])
    const nft = await Nft.find(idNFT)

    if (!nft) {
      return ctx.response.status(404).json({ message: 'NFTPost not found' })
    }

    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    const isLiked = await nft.related('userLike').query().where('id_minter', user.id).first()

    if (isLiked) {
      return ctx.response.status(200).json({ isLiked: true })
    } else {
      return ctx.response.status(200).json({ isLiked: false })
    }
  }
}
