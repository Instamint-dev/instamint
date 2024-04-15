import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

export default class UserController {
  async update({ request, response }: HttpContext) {
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
      // user.image = await this.base64ToBinary(image)

      if (image) {

        user.image = await this.uploadImage(image)
        console.log(user.image)
      }
      await user.save()

      return response.status(200).json({ message: 'User updated successfully', user })
    } catch (error) {
      console.error('Error updating user:', error)
      return response.status(500).json({ message: 'Failed to update user' })
    }
  }

  async uploadImage(image: string) {
    try {
      const formData = new FormData()
      formData.append('image', image)

      // URL de téléversement sur le serveur iharoun.fr
      const uploadUrl = 'https://iharoun.fr/instamint_img/'

      const uploadResponse = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      return uploadResponse.data.url
    } catch (error) {
      console.error('Error uploading image:', error)
      throw new Error('Failed to upload image')
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
        return response.status(404).json({ message: 'Utilisateur introuvable' })
      }
      user.username = newLogin

      await user.save()

      return response.status(200).json({ message: 'Login mis à jour avec succès' })
    } catch (error) {
      console.error('Erreur lors de la mise à jour du login:', error)
      return response.status(500).json({ message: 'Échec de la mise à jour du login' })
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

  // private async base64ToBinary(base64String: string): Promise<Buffer> {
  //   const base64Data = base64String.replace(/^data:image\/jpegbase64,/, '')
  //   return Buffer.from(base64Data, 'base64')
  // }
}
