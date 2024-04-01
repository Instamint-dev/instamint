import axios from "axios";
import user_register from "../../../type/user_register.ts";
const API_URL = 'http://localhost:3333';
const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  };
export const registerUser = async (userData: user_register) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Erreur lors de l’inscription');
        } else {
            throw new Error('Erreur lors de la connexion au serveur');
        }
    }
};