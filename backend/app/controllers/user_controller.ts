// app/Controllers/Http/UserController.ts

import User from '#models/user'
import {HttpContext} from "@adonisjs/core/http";
import { LocalStorage } from 'node-localstorage';

// Créer une instance de LocalStorage
export default class UserController {
    public async update({ request, response }: HttpContext) {
        try {

            const { username, email, bio, visibility ,profilePhoto} = request.only(['username', 'email', 'bio','visibility','profilePhoto']);
            const localStorage = new LocalStorage('./scratch');

            const a = localStorage.getItem('profileImage');

            console.log("cc"+a)

            console.log(profilePhoto);

            let user = await User.findBy('username', username);

            if (!user) {
                return response.status(404).json({ message: 'User not found' });
            }
            user.email = email;
            user.bio = bio;
            user.status = visibility;

            const image = request.file('compressed_image.jpg'); // Limitez la taille du fichier si nécessaire
                console.log(image);

            if (request.file('compressed_image.jpg')) {

                if (!image) {
                    // return response.status(400).json({ message: 'Invalid file' });
                }


                // if (image && image.tmpPath) {
                //     user.image = await fs.readFile(image.tmpPath);
                //     await user.save();
                //     // return response.status(200).json(user);
                // } else {
                //     // return response.status(400).json({ message: 'Image file path is not defined' });
                // }
            } else {
                await user.save();
                // return response.status(200).json(user);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            // return response.status(500).json({ message: 'Failed to update user' });
        }
    }

}
