import axios from "axios"
import USER_LOGIN from "../../../type/user_login.ts"
import AXIOS_ERROR from "../../../type/axios_error.ts"
const API_URL = "http://localhost:3333"
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
export const loginUser = async (userData: USER_LOGIN) => {
    try {
        const { username, password } = userData
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password
        }, config)

        if (response.status === 200) {
            console.log( response.data)
        } else {
            throw new Error("Erreur lors de la connexion")
        }
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).response?.data?.message) {
            throw new Error((err as AXIOS_ERROR).response?.data?.message || "Erreur lors de la connexion")
        } else {
            throw new Error("Erreur lors de la connexion au serveur")
        }
    }
}
