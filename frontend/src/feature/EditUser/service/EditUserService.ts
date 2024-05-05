import axios from "axios"
import UPDATE_PROFILE_RESPONSE from "../../../type/request/updateprofile_response.ts"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import USER_PROFIL from "../../../type/feature/user/user_profil.ts"
import USER_CHANGE_USERNAME from "../../../type/feature/user/user_change_username.ts"
import Cookies from "universal-cookie"
import TokenAuth from "../../../type/feature/user/tokenAuth.ts"

const cookies = new Cookies()
const authToken: TokenAuth | undefined = cookies.get("token") as TokenAuth | undefined
const API_URL: string  = import.meta.env.VITE_BACKEND_URL
const authorizationHeader = authToken ? authToken.headers.authorization : ""
const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": authorizationHeader,
    },
    withCredentials: true
}
export const updateProfile = async (userData: USER_PROFIL): Promise<UPDATE_PROFILE_RESPONSE> => {
    try {
        const response = await axios.post<UPDATE_PROFILE_RESPONSE>(`${API_URL}/updateProfil`, userData, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error("Error editing user profile")
        }
        else {
            throw new Error("Error editing user profile")
        }
    }
}

export const getDataProfil = async (): Promise<USER_PROFIL>=>{
    try {
        const response = await axios.post<USER_PROFIL>(`${API_URL}/getDataProfil`, {}, config)

        return response.data
    } catch (error:unknown) {
        throw new Error("Error fetching user profile")
    }
}



export const updateUsername = async (oldLogin: string, newLogin: string): Promise<boolean> => {
    try {
        const response = await axios.post<USER_CHANGE_USERNAME>(`${API_URL}/changeLogin`, { oldLogin, newLogin }, config)

        return response.status === 200
    } catch (error:unknown) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error( "Error updating login")
        } else {
            throw new Error("Error updating login")
        }
    }
}

export const updatePassword = async (newPassword:string): Promise<boolean>=>{
    try {
        const response = await axios.post<USER_CHANGE_USERNAME>(`${API_URL}/changePassword`, { newPassword},config)

        return response.status === 200
    } catch (error:unknown) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error updating password")
        } else {
            throw new Error("Error updating password")
        }
    }
}
