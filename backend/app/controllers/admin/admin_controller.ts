import { HttpContext } from '@adonisjs/core/http';
import User from '#models/user';
import TeaBag from '#models/tea_bag';
import NFT from '#models/nft';
import Report from '#models/report_minter';
import Commentary from '#models/commentary';
import { randomBytes } from 'crypto';
import Admin from '#models/admin';

export default class AdminController {
   async disableUser({ params, response, auth }: HttpContext) {
    try {
      const admin = await auth.authenticate();
      if (!admin) {
        return response.status(403).json({ message: 'Access denied. Only administrators can perform this action.' });
      }

      const user = await User.find(params.id);
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      await user.save();
      
      return response.status(200).json({ message: 'User disabled successfully' });
    } catch (error) {
      console.error('Error disabling User:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteUser({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id);
      await user.delete();
      
      return response.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting User:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteTeaBag({ params, response }: HttpContext) {
    try {
      const teaBag = await TeaBag.findOrFail(params.id);
      await teaBag.delete();
      
      return response.status(200).json({ message: 'Tea Bag deleted successfully' });
    } catch (error) {
      console.error('Error deleting Tea Bag:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteNFT({ params, response }: HttpContext) {
    try {
      const nft = await NFT.findOrFail(params.id);
      await nft.delete();
      
      return response.status(200).json({ message: 'NFT deleted successfully' });
    } catch (error) {
      console.error('Error deleting NFT:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteCommentary({ params, response }: HttpContext) {
    try {
      const commentary = await Commentary.findOrFail(params.id);
      await commentary.delete();
      
      return response.status(200).json({ message: 'Commentary deleted successfully' });
    } catch (error) {
      console.error('Error deleting Commentary:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async listReports({ response }: HttpContext) {
    try {
      const reports = await Report.all();
      
      return response.status(200).json({ reports });
    } catch (error) {
      console.error('Error listing reports:', error);
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async connection({ request, response }: HttpContext) {
    try {
      const { username, password } = request.only(['username', 'password']);
      const admin = await Admin.findBy('username', username);
      
      if (!admin) {
        return response.status(401).json({ message: 'Invalid credentials' });
      }
      
      const isPasswordValid = await admin.verifyPassword(password);
      
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
