import { HttpContext } from '@adonisjs/core/build/standalone'
import db from '@adonisjs/lucid/services/db'

export default class DailyStatistiqueController {
  async countUsers({ response }: HttpContext) {
    try {
      const userCount = await db.from('users').count('* as total')

      const totalUsers = userCount[0]?.total || 0

      return response.status(200).json({ totalUsers })
    } catch (error) {
      return response.status(500).json({ message: 'Failed to count users', error: error.message })
    }
  }

  async countCommentaries({ response }: HttpContext) {
    try {
      const commentaryCount = await db.from('commentaries').count('* as total')
      const totalCommentaries = commentaryCount[0]?.total || 0

      return response.status(200).json({ totalCommentaries })
    } catch (error) {
      console.error('Error counting commentaries:', error)
      return response
        .status(500)
        .json({ message: 'Failed to count commentaries', error: error.message })
    }
  }

  async countCommentariesByNft({ response }: HttpContext) {
    try {
      const commentariesByNft = await db
        .from('nfts')
        .select('nfts.id', 'nfts.link')
        .leftJoin('commentaries', 'nfts.id', 'commentaries.id_nft')
        .groupBy('nfts.id', 'nfts.link')
        .count('commentaries.id as totalCommentaries')

      return response.status(200).json(commentariesByNft)
    } catch (error) {
      console.error('Error counting commentaries by NFT:', error)
      return response
        .status(500)
        .json({ message: 'Failed to count commentaries by NFT', error: error.message })
    }
  }

  async listUsersWithNftCount({ response }: HttpContext) {
    try {
      const usersWithNftCount = await db
        .from('users')
        .select('users.id', 'users.username')
        .leftJoin('have_nfts', 'users.id', 'have_nfts.id_minter')
        .groupBy('users.id', 'users.username')
        .count('have_nfts.id_nft as nftCount')

      return response.status(200).json(usersWithNftCount)
    } catch (error) {
      console.error('Error listing users with NFT count:', error)
      return response
        .status(500)
        .json({ message: 'Failed to list users with NFT count', error: error.message })
    }
  }

  async listUsersWithNftComments({ response }: HttpContext) {
    try {
      const usersWithNftComments = await db
        .from('users')
        .leftJoin('nfts', 'users.id', 'nfts.id')
        .leftJoin('commentaries', 'nfts.id', 'commentaries.id_nft')
        .select(
          'users.id',
          'users.username',
          'nfts.id as nft_id',
          'nfts.description as nft_description',
          db.raw('count(commentaries.id) as commentCount')
        )
        .groupBy('users.id', 'users.username', 'nfts.id', 'nfts.description')

      return response.status(200).json(usersWithNftComments)
    } catch (error) {
      console.error('Error listing users with NFT comments:', error)
      return response
        .status(500)
        .json({ message: 'Failed to list users with NFT comments', error: error.message })
    }
  }

  async listUsersWithNftViews({ response }: HttpContext) {
    try {
      const usersWithNftViews = await db
        .from('minter_nft_views')
        .leftJoin('users', 'minter_nft_views.id_minter', 'users.id')
        .select(
          'users.id',
          'users.username',
          db.raw('COUNT(DISTINCT minter_nft_views.id_nft) as nftViewCount')
        )
        .groupBy('users.id', 'users.username')

      return response.status(200).json(usersWithNftViews)
    } catch (error) {
      console.error('Error listing users with NFT views:', error)
      return response
        .status(500)
        .json({ message: 'Failed to list users with NFT views', error: error.message })
    }
  }
}
