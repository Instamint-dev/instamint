import axios from "axios"
import USER_REGISTER from "../../../type/user_register.ts"
import AXIOS_ERROR from "../../../type/axios_error.ts"
import REGISTER_RESPONSE from "../../../type/register_response.ts"
const API_URL = "http://localhost:3333"
const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  }
export const registerUser = async (userData: USER_REGISTER) : Promise<REGISTER_RESPONSE> => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).response?.data?.message) {
            throw new Error((err as AXIOS_ERROR).response?.data?.message || "Erreur lors de la connexion")
        } else {
            throw new Error("Erreur lors de la connexion")
        }
    }
}