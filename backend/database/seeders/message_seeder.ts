import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Message from "#models/message";

export default class MessageSeeder extends BaseSeeder {
    public async run () {
        await Message.createMany([
            {
                sender_id: 1,
                receiver_id: 2,
                content: "Il fait beau aujourd'hui !",
                send_date: '2024-05-04', // Définir la date au format YYYY-MM-DD
            },
            {
                sender_id: 2,
                receiver_id: 1,
                content: "Oui, c'est une journée magnifique !",
                send_date: '2024-05-05', // Définir la date au format YYYY-MM-DD
            },
            {
                sender_id: 1,
                receiver_id: 2,
                content: "Hier, le soleil brillait fort !",
                send_date: '2024-05-06', // Définir la date au format YYYY-MM-DD
            },
            {
                sender_id: 2,
                receiver_id: 1,
                content: "Je suis d'accord, c'était une journée parfaite !",
                send_date: '2024-05-07', // Définir la date au format YYYY-MM-DD
            },
            // Ajout d'une discussion entre les utilisateurs 2 et 4
            {
                sender_id: 2,
                receiver_id: 4,
                content: "Salut, comment ça va ?",
                send_date: '2024-05-06', // Définir la date au format YYYY-MM-DD
            },
            {
                sender_id: 4,
                receiver_id: 2,
                content: "Ça va bien, merci ! Et toi ?",
                send_date: '2024-05-06', // Définir la date au format YYYY-MM-DD
            },
            {
                sender_id: 4,
                receiver_id: 2,
                content: "Je vais bien aussi, merci !",
                send_date: '2024-05-07', // Définir la date au format YYYY-MM-DD
            },
        ])
    }
}
