import { HttpContext } from '@adonisjs/core/http';
import { randomBytes } from 'crypto';
import Admin from '#models/admin';

export default class AdminController {

  async handleLogin({ request, response }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password']);
      
      
      const isPasswordValid = await Admin.verifyCredentials(username, password)
      
      if (!isPasswordValid) {
        return response.status(401).json({ message: 'Invalid credentials' });
      }
      
      const token = this.generateToken();
      
      return response.json({ token });
    } catch (error) {
      console.error('Error attempting to connect:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  private generateToken(): string {
    const tokenLength = 255;
    let token = '';
    while (token.length < tokenLength) {
      const buffer = randomBytes(tokenLength - token.length);
      const potentialToken = buffer.toString('base64').replace(/[^a-zA-Z0-9]/g, '');
      token += potentialToken.slice(0, tokenLength - token.length);
    }
    return token;
  }
}
