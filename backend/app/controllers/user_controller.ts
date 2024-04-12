import User from '#models/user';
import {HttpContext} from "@adonisjs/core/http";

export default class UserController {
  public async update({ request, response }: HttpContext) {
    try {
      const { username, email, bio, visibility, profilePhoto } = request.only(['username', 'email', 'bio', 'visibility', 'profilePhoto']);

      const user = await User.findBy('username', username);

      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      user.email = email;
      user.bio = bio;
      user.status = visibility;

      user.image = await this.base64ToBinary(profilePhoto);

      await user.save();

      return response.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      return response.status(500).json({ message: 'Failed to update user' });
    }
  }

  private async base64ToBinary(base64String: string): Promise<Buffer> {
    const base64Data = base64String.replace(/^data:image\/jpeg;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }
}
