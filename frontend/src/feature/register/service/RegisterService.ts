import axios from "axios";
import user_register from "../../../type/user_register.ts";
const API_URL = 'http://localhost:5174';

export const registerUser = async (userData: user_register) => {
    try {
        console.log('register '+userData.username);
        const response = await axios.post(`${API_URL}/register`, userData);
        console?.log(response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de l’inscription');
        } else {
            // Gérer des erreurs de connexion ou autres erreurs inattendues
            throw new Error('Erreur lors de la connexion au serveur');
        }
    }
};