import axios from "axios"
import UPDATE_PROFILE_RESPONSE from "../../../type/request/updateprofile_response.ts"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import USER_PROFIL from "../../../type/feature/user/user_profil.ts"
import USER_CHANGE_USERNAME from "../../../type/feature/user/user_change_username.ts"
const API_URL = "http://localhost:3333"
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
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
        const response = await axios.post<USER_PROFIL>(`${API_URL}/getDataProfil`, {
             username
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw new Error("Error fetching user profile")
    }
}



export const updateUsername = async (oldLogin: string, newLogin: string): Promise<USER_CHANGE_USERNAME> => {
    try {
        const response = await axios.post<USER_CHANGE_USERNAME>(`${API_URL}/changeLogin`, { oldLogin, newLogin });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du login');
        } else {
            throw new Error('Erreur lors de la mise à jour du login');
        }
    }
};



