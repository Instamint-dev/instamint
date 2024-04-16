import axios from "axios"
import UPDATE_PROFILE_RESPONSE from "../../../type/request/updateprofile_response.ts"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import USER_PROFIL from "../../../type/feature/user/user_profil.ts"
import USER_CHANGE_USERNAME from "../../../type/feature/user/user_change_username.ts"
const API_URL = import.meta.env.VITE_BACKEND_URL
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
export const updateProfile = async (userData: USER_PROFIL): Promise<boolean> => {
    try {
        const response = await axios.post<UPDATE_PROFILE_RESPONSE>(`${API_URL}/updateProfil`, userData, config)

        return response.status === 200
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error("Error editing user profile")
        }
        else {
            throw new Error("Error editing user profile")
        }
    }
}


export const getDataProfil = async (): Promise<USER_PROFIL> => {
    const username = sessionStorage.getItem("login")

    try {
        const response = await axios.post<USER_PROFIL>(`${API_URL}/getDataProfil`, {
             username
        })

        return response.data
    } catch (error:unknown) {
        throw new Error("Error fetching user profile")
    }
}



export const updateUsername = async (oldLogin: string, newLogin: string): Promise<boolean> => {
    try {
        const response = await axios.post<USER_CHANGE_USERNAME>(`${API_URL}/changeLogin`, { oldLogin, newLogin })

        return response.status === 200
    } catch (error:unknown) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error( "Error updating login")
        } else {
            throw new Error("Error updating login")
        }
    }
}

export const updatePassword = async (username: string,newLogin:string): Promise<boolean>=>{
    try {
        const response = await axios.post<USER_CHANGE_USERNAME>(`${API_URL}/changePassword`, { newLogin,username})

        return response.status === 200
    } catch (error:unknown) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error updating password")
        } else {
            throw new Error("Error updating password")
        }
    }
}

export const checkLoginExists = async (login: string): Promise<{ exists: boolean }> => {
    try {
        const response = await axios.post<{ exists: boolean }>(`${API_URL}/check-login`, { login })

        return response.data
    } catch (error:unknown) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error((error as AXIOS_ERROR).message || "Error checking login")
        } else {
            throw new Error("Error checking login")
        }
    }
}

export const checkEmailExists = async (email: string): Promise<{ exists: boolean }> => {
    try {
        const response = await axios.post<{ exists: boolean }>(`${API_URL}/check-mail`, { email })

        return response.data
    } catch (error:unknown) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error checking login")
        } else {
            throw new Error("Error checking login")
        }
    }
}



