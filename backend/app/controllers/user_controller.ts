import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'
import env from '#start/env'
export default class UserController {
  async update(ctx: HttpContext) {
    const logo = 'https://instamintkami.blob.core.windows.net/instamint/user.png'
    const accountName = env.get('AZURE_ACCOUNT_NAME') || ''
    const accountKey = env.get('AZURE_ACCOUNT_KEY') || ''
    const containerName = env.get('AZURE_CONTAINER_PROFIL_IMAGE') || ''
    let check = 0

    try {
      const { username, email, bio, visibility, image, link } = ctx.request.only([
        'username',
        'email',
        'bio',
        'visibility',
        'image',
        'link',
      ])

      const user = ctx.auth.use('api').user

      if (!user) {
        return ctx.response.status(404).json({ message: 'User not found' })
      }
      const CHECK_LINK = await User.findManyBy({'link': link})
      CHECK_LINK.forEach((element) => {
        if (element.id !== user.id) {
          check = 1
        }
      })
      const CHECK_EMAIL = await User.findManyBy({'email': email})
      CHECK_EMAIL.forEach((element) => {
        if (element.id !== user.id) {
          check = 2
        }
      })
      const CHECK_USERNAME = await User.findManyBy({'username': username})
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

      if (user.image.trim() !== logo.trim() && user.image.trim() !== image.trim()) {
        await deleteImage(user.image, accountName, accountKey, containerName)
        user.image = await uploadBase64ImageToAzureStorage(
          image,
          generateRandomImageName(),
          env.get('AZURE_ACCOUNT_NAME') || '',
          env.get('AZURE_ACCOUNT_KEY') || '',
          env.get('AZURE_CONTAINER_PROFIL_IMAGE') || ''
        )
      } else {
        user.image = await uploadBase64ImageToAzureStorage(
          image,
          generateRandomImageName(),
          env.get('AZURE_ACCOUNT_NAME') || '',
          env.get('AZURE_ACCOUNT_KEY') || '',
          env.get('AZURE_CONTAINER_PROFIL_IMAGE') || ''
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
      const { bio, image, status, email, username, id, link } = user

      return response.status(200).json({ id, bio, image, visibility: status, email, username, link })
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
}

export async function uploadBase64ImageToAzureStorage(
  base64Image: string,
  imageName: string,
  accountName: string,
  accountKey: string,
  containerName: string
): Promise<string> {
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  )

  const containerClient = blobServiceClient.getContainerClient(containerName)

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '')
  const buffer = Buffer.from(base64Data, 'base64')

  try {
    const blockBlobClient = containerClient.getBlockBlobClient(imageName)
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: {
        blobContentType: 'image/jpeg',
      },
    })
    return `https://${accountName}.blob.core.windows.net/${containerName}/${imageName}`
  } catch (error) {
    throw new Error('Failed to upload image to Azure Storage')
  }
}

export function generateRandomImageName(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * 10))
  }
  return result + '.jpg'
}

export async function deleteImage(
  imageUrl: string,
  accountName: string,
  accountKey: string,
  containerName: string
): Promise<void> {
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  )

  const containerClient = blobServiceClient.getContainerClient(containerName)

  try {
    const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
    const blobClient = containerClient.getBlobClient(imageName)
    const blobExists = await blobClient.exists()

    if (blobExists) {
      await blobClient.delete()
    }
  } catch (error) {
    throw new Error('Failed to delete image from Azure Storage')
  }
}
