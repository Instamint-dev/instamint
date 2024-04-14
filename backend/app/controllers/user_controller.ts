import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async update({ request, response }: HttpContext) {
    try {
      const { username, email, bio, visibility, image } = request.only([
        'username',
        'email',
        'bio',
        'visibility',
        'image',
      ])
      const user = await User.findBy('username', username)

      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }

      user.email = email
      user.bio = bio
      user.status = visibility
      user.image = await this.base64ToBinary(image)
      await user.save()

      return response.status(200).json({ message: 'User updated successfully', user })
    } catch (error) {
      console.error('Error updating user:', error)
      return response.status(500).json({ message: 'Failed to update user' })
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

      return response.status(200).json({ bio, image, visibility: status, email })
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
      console.log(request.all())
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

  private async base64ToBinary(base64String: string): Promise<Buffer> {
    const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, '')
    return Buffer.from(base64Data, 'base64')
  }
}
