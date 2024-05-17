import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import TeaBag from '#models/tea_bag'
import env from '#start/env'
import {
  deleteImage,
  generateRandomImageName,
  uploadBase64ImageToAzureStorage,
} from '#services/azure_service'
import db from '@adonisjs/lucid/services/db'

export default class TeabagsController {
  async createTeaBag(ctx: HttpContext) {
    const USER_CONNECT = ctx.auth.user
    const { teaBag } = ctx.request.only(['teaBag'])

    const ifLinkExist = await db.from('users').where('link', teaBag.link)
    const ifUsernameExist = await db.from('users').where('username', teaBag.username)

    if (ifLinkExist.length > 0) {
      return ctx.response.json({ message: 'Link already exist', status: false })
    } else if (ifUsernameExist.length > 0) {
      return ctx.response.json({ message: 'Username already exist', status: false })
    }

    const user = await User.create({
      username: teaBag.username,
      image: await uploadBase64ImageToAzureStorage(
        teaBag.image,
        generateRandomImageName(),
        env.get('AZURE_ACCOUNT_NAME') || '',
        env.get('AZURE_ACCOUNT_KEY') || '',
        env.get('AZURE_CONTAINER_PROFIL_IMAGE') || ''
      ),
      bio: teaBag.bio,
      link: teaBag.link,
      email: '',
      password: '',
      status: 'public',
    })

    if (!USER_CONNECT) {
      return ctx.response.status(401).json({ message: 'Unauthorized', status: false })
    }
    await user.save()

    const cookValue = JSON.stringify([USER_CONNECT.id])
    const teaBag1 = await TeaBag.create({
      id: user.id,
      cook: cookValue,
    })
    await teaBag1.save()

    await db.table('followers').insert({ follower: USER_CONNECT.id, followed: teaBag1.id })

    return ctx.response.status(200).json({ message: true, status: true })
  }

  async getTeaBags(ctx: HttpContext) {
    const teaBags = await db
      .from('users')
      .select('id', 'username', 'image', 'bio', 'link')
      .whereIn('id', (query) => {
        query.from('tea_bags').select('id')
      })

    return ctx.response.status(200).json(teaBags)
  }

  async getMyTeaBags(ctx: HttpContext) {
    const USER_CONNECT = ctx.auth.user
    if (!USER_CONNECT) {
      return ctx.response.status(401).json({ message: 'Unauthorized' })
    }
    const teaBags = await db
      .from('users')
      .select('id', 'username', 'image', 'bio', 'link')
      .whereIn('id', (query) => {
        query.from('tea_bags').select('id').where('cook', 'like', `%${USER_CONNECT.id}%`)
      })

    return ctx.response.status(200).json(teaBags)
  }

  async updateTeaBag(ctx: HttpContext) {
    const USER_CONNECT = ctx.auth.user
    const { teaBag } = ctx.request.only(['teaBag'])

    if (!USER_CONNECT) {
      return ctx.response.status(401).json({ message: 'Unauthorized' })
    }

    const user = await User.findBy('link', teaBag.link)
    if (!user) {
      return ctx.response.status(404).json({ message: 'User not found' })
    }

    if (user.username !== teaBag.username) {
      const ifUsernameExist = await db.from('users').where('username', teaBag.username)
      if (ifUsernameExist.length > 0) {
        return ctx.response.json({ message: 'Username already exist', status: false })
      }
    } else if (user.link !== teaBag.link) {
      const ifLinkExist = await db.from('users').where('link', teaBag.link)
      if (ifLinkExist.length > 0) {
        return ctx.response.json({ message: 'Link already exist', status: false })
      }
    }

    user.username = teaBag.username
    user.bio = teaBag.bio
    user.link = teaBag.link
    await user.save()

    if (user.image.trim() !== teaBag.image.trim()) {
      await deleteImage(
        user.image,
        env.get('AZURE_ACCOUNT_NAME') || '',
        env.get('AZURE_ACCOUNT_KEY') || '',
        env.get('AZURE_CONTAINER_PROFIL_IMAGE') || ''
      )
      user.image = await uploadBase64ImageToAzureStorage(
        teaBag.image,
        generateRandomImageName(),
        env.get('AZURE_ACCOUNT_NAME') || '',
        env.get('AZURE_ACCOUNT_KEY') || '',
        env.get('AZURE_CONTAINER_PROFIL_IMAGE') || ''
      )
    }
    return ctx.response.status(200).json({ message: 'Tea Bag updated successfully', status: true })
  }
}