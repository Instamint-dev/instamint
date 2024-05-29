import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Message from '#models/message'

export default class MessageSeeder extends BaseSeeder {
  async run() {
    await Message.createMany([
      {
        sender_id: 1,
        receiver_id: 2,
        content: 'Il fait beau en ce jour!',
        send_date: '2024-05-04',
      },
      {
        sender_id: 2,
        receiver_id: 1,
        content: 'Oui, il faisait beau !',
        send_date: '2024-05-05',
      },
      {
        sender_id: 1,
        receiver_id: 2,
        content: 'Hier, le soleil brillait fort !',
        send_date: '2024-05-06',
      },
      {
        sender_id: 2,
        receiver_id: 1,
        content: 'Tu as raison !',
        send_date: '2024-05-07',
      },
      {
        sender_id: 2,
        receiver_id: 4,
        content: 'Salut, comment ça va ?',
        send_date: '2024-05-06',
      },
      {
        sender_id: 4,
        receiver_id: 2,
        content: 'Ça va bien, merci ! Et toi ?',
        send_date: '2024-05-06',
      },
      {
        sender_id: 4,
        receiver_id: 2,
        content: 'Je vais bien aussi, merci !',
        send_date: '2024-05-07',
      },
    ])
  }
}
