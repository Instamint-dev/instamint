import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'

export default class UserController {
  async update({ request, response }: HttpContext) {
    const logo = 'https://instamintkami.blob.core.windows.net/instamint/user.png'

    async function deleteImage(imageUrl: string): Promise<void> {
      const accountName = process.env.AZURE_ACCOUNT_NAME || ''
      const accountKey = process.env.AZURE_ACCOUNT_KEY || ''
      const containerName = process.env.AZURE_CONTAINER_NAME || ''

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
        console.error('Error deleting image from Azure Storage:', error)
        throw new Error('Failed to delete image from Azure Storage')
      }
    }

    try {
      const { username, email, bio, visibility, image, usernameOld } = request.only([
        'username',
        'email',
        'bio',
        'visibility',
        'image',
        'usernameOld',
      ])

      const user = await User.findBy('username', usernameOld)

      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }

      user.username = username
      user.email = email
      user.bio = bio
      user.status = visibility

      if (user.image !== logo) {
        await deleteImage(user.image)
      }
      user.image = await uploadBase64ImageToAzureStorage(image, generateRandomImageName())
      await user.save()

      return response.status(200).json({ message: 'User updated successfully', user })
    } catch (error) {
      console.error('Error updating user:', error)
      return response.status(500).json({ message: 'Failed to update user' })
    }

    function generateRandomImageName(): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * 10))
      }
      return result + '.jpg'
    }
  }

  async getUserProfile({ request, response }: HttpContext) {
    try {
      const { username } = request.only(['username'])
      const user = await User.findBy('username', username)
      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }

      const { bio, image, status, email } = user

      return response.status(200).json({ bio, image, visibility: status, email, username })
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return response.status(500).json({ message: 'Failed to fetch user profile' })
    }
  }

  async updateLogin({ request, response }: HttpContext) {
    try {
      const { oldLogin, newLogin } = request.only(['oldLogin', 'newLogin'])
      const user = await User.findBy('username', oldLogin)
      if (!user) {
        return response.status(404).json({ message: 'Username not found' })
      }
      user.username = newLogin

      await user.save()

      return response.status(200).json({ message: 'Login update ' })
    } catch (error) {
      console.error('Erreur lors de la mise à jour du login: ', error)
      return response.status(500).json({ message: 'Error updating login ' })
    }
  }

  async updatePassword({ request, response }: HttpContext) {
    try {
      const { newLogin, username } = request.only(['newLogin', 'username'])
      const user = await User.findBy('username', username)
      if (!user) {
        return response.status(404).json({ message: 'Username no found' })
      }
      user.password = newLogin
      await user.save()
      return response.status(200).json({ message: 'Passwoard update ! ' })
    } catch (error) {
      console.error('Error updating password', error)
      return response.status(500).json({ message: 'Failed to update password' })
    }
  }

  async checkLoginExists({ request, response }: HttpContext) {
    try {
      const { login } = request.all()
      const user = await User.findBy('username', login)

      if (user) {
        return response.status(200).json({ exists: true })
      } else {
        return response.status(200).json({ exists: false })
      }
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while verifying the login.' })
    }
  }

  async checkEmailExists({ request, response }: HttpContext) {
    try {
      const { email } = request.all()
      const user = await User.findBy('email', email)

      if (user) {
        return response.status(200).json({ exists: true })
      } else {
        return response.status(200).json({ exists: false })
      }
    } catch (error) {
      return response.status(500).json({ error: 'An error occurred while verifying the login.' })
    }
  }
}

async function uploadBase64ImageToAzureStorage(base64Image: string, imageName: string) {
  const accountName = process.env.AZURE_ACCOUNT_NAME || ''
  const accountKey = process.env.AZURE_ACCOUNT_KEY || ''
  const containerName = process.env.AZURE_CONTAINER_NAME || ''

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
