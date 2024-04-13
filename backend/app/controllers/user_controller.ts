import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async update({request, response}: HttpContext) {
    try {
      const {username, email, bio, visibility, image} = request.only([
        'username',
        'email',
        'bio',
        'visibility',
        'image',
      ])
      const user = await User.findBy('username', username)

      if (!user) {
        return response.status(404).json({message: 'User not found'})
      }

      user.email = email
      user.bio = bio
      user.status = visibility

      // console.log(image)

      // const compressedImage = await this.resizeAndEncodeImage(image, 50, 50)

       // console.log(this.base64ToBinary(compressedImage))
      user.image = await this.base64ToBinary(image)


      // console.log(user.image)

      await user.save()

      return response.status(200).json({message: 'User updated successfully', user})
    } catch (error) {
      console.error('Error updating user:', error)
      return response.status(500).json({message: 'Failed to update user'})
    }
  }

  async getUserProfile({request, response}: HttpContext) {
    // console.log(request.all())
    try {
      const {username} = request.only(['username'])
      // console.log(username)
      const user = await User.findBy('username', username)
      // console.log(user)
      if (!user) {
        return response.status(404).json({message: 'User not found'})
      }

      const {bio, image, status, email} = user

      return response.status(200).json({bio, image, visibility: status, email})
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return response.status(500).json({message: 'Failed to fetch user profile'})
    }
  }

  private async base64ToBinary(base64String: string): Promise<Buffer> {
    const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, '')
    return Buffer.from(base64Data, 'base64')
  }





}


