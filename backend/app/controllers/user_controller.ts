import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import {
  AZURE_ACCOUNT_KEY,
  AZURE_ACCOUNT_NAME,
  AZURE_CONTAINER_PROFIL_IMAGE,
} from '#services/azure_service'
import {
  deleteImage,
  generateRandomImageName,
  uploadBase64ImageToAzureStorage,
} from '#services/azure_service'
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'
import env from '#start/env'
import db from '@adonisjs/lucid/services/db'
export default class UserController {
  async update(ctx: HttpContext) {
    const logo = 'https://instamintkami.blob.core.windows.net/instamint/user.png'
    let check = 0

    try {
      const { username, email, bio, visibility, image, link, SEARCH_STATUS, phone } =
        ctx.request.only([
          'username',
          'email',
          'bio',
          'visibility',
          'image',
          'link',
          'SEARCH_STATUS',
          'phone',
        ])

      const user = ctx.auth.use('api').user

      if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }
      const CHECK_LINK = await User.findManyBy({ link: link })
      CHECK_LINK.forEach((element) => {
        if (element.id !== user.id) {
          check = 1
        }
      })
      const CHECK_EMAIL = await User.findManyBy({ email: email })
      CHECK_EMAIL.forEach((element) => {
        if (element.id !== user.id) {
          check = 2
        }
      })
      const CHECK_USERNAME = await User.findManyBy({ username: username })
      CHECK_USERNAME.forEach((element) => {
        if (element.id !== user.id) {
          check = 3
        }
      })

      switch (check) {
        case 1:
          return ctx.response.status(200).json({ message: 'Link already exist' })
        case 2:
          return ctx.response.status(200).json({ message: 'Email already exist' })
        case 3:
          return ctx.response.status(200).json({ message: 'Username already exist' })
      }

      user.username = username
      user.email = email
      user.bio = bio
      user.status = visibility
      user.link = link
      user.searchStatus = SEARCH_STATUS
      user.phone = phone

      if (visibility === 'public') {
        await db
          .from('follow_requests')
          .andWhere('minter_follow_receive', user.id)
          .update({ etat: 1 })
      }

      if (user.image.trim() !== logo.trim() && user.image.trim() !== image.trim()) {
        await deleteImage(
          user.image,
          AZURE_ACCOUNT_NAME,
          AZURE_ACCOUNT_NAME,
          AZURE_CONTAINER_PROFIL_IMAGE
        )
        user.image = await uploadBase64ImageToAzureStorage(
          image,
          generateRandomImageName(),
          AZURE_ACCOUNT_NAME,
          AZURE_ACCOUNT_KEY,
          AZURE_CONTAINER_PROFIL_IMAGE
        )
      } else {
        user.image = await uploadBase64ImageToAzureStorage(
          image,
          generateRandomImageName(),
          AZURE_ACCOUNT_NAME,
          AZURE_ACCOUNT_KEY,
          AZURE_CONTAINER_PROFIL_IMAGE
        )
      }

      await user.save()

      return ctx.response.status(200).json({ message: 'User updated successfully', user })
    } catch (error) {
      return ctx.response.status(500).json({ message: 'Failed to update user' })
    }
  }
  async getUserProfile({ response, auth }: HttpContext) {
    try {
      const user = auth.use('api').user
      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }
      const { bio, image, status, email, username, id, link, searchStatus, phone } = user

      return response.status(200).json({
        id,
        bio,
        image,
        visibility: status,
        email,
        username,
        link,
        SEARCH_STATUS: searchStatus,
        phone: phone,
      })
    } catch (error) {
      return response.status(500).json({ message: 'Failed to fetch user profile' })
    }
  }
  async updatePassword({ request, response, auth }: HttpContext) {
    try {
      const { newPassword } = request.only(['newPassword'])
      const user = auth.use('api').user
      if (!user) {
        return response.status(404).json({ message: 'Username no found' })
      }
      user.password = newPassword
      await user.save()
      return response.status(200).json({ message: 'Passwoard update ! ' })
    } catch (error) {
      return response.status(500).json({ message: 'Failed to update password' })
    }
  }
  async deleteUser(ctx: HttpContext) {
    const { id } = ctx.request.only(['id'])
    const user = await User.find(id)
    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }
    await user.delete()
    return ctx.response.status(200).json({ message: 'User deleted' })
  }
}
