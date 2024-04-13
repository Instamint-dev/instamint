import axios from "axios"
import UPDATE_PROFILE_RESPONSE from "../../../type/request/updateprofile_response.ts"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import USER_PROFIL from "../../../type/feature/user/user_profil.ts"
// import BUFFER_IMAGE from "../../../type/feature/user/buffer_image.ts";

const API_URL = "http://localhost:3333"
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
// Fonction pour convertir une chaîne de données base64 en un objet blob
export const updateProfile = async (userData: USER_PROFIL): Promise<UPDATE_PROFILE_RESPONSE> => {
    try {
        const response = await axios.post<UPDATE_PROFILE_RESPONSE>(`${API_URL}/updateProfil`, userData, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error editing user profile")
        } else {
            throw new Error("Error editing user profile")
        }
    }
}


export const getDataProfil = async (): Promise<USER_PROFIL> => {
    const username = sessionStorage.getItem("login");

    try {
        // Faites la requête pour récupérer les données du profil
        const response = await axios.post<USER_PROFIL>(`${API_URL}/user/profile`, {
             username
        });

        // Retournez les données du profil
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw new Error("Error fetching user profile");
    }


}


