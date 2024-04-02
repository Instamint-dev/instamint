import axios from "axios";
import user_login from "../../../type/user_login.ts";
const API_URL = 'http://localhost:3333';
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
};
export const loginUser = async (userData: user_login) => {
    try {
        const { username, password } = userData;

        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        }, config);

        if (response.status === 200) {
            console.log( response.data);
        } else {
            throw new Error('Erreur lors de la connexion');
        }

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de la connexion');
        } else {
            throw new Error('Erreur lors de la connexion au serveur');
        }
    }
};
