import axios from "axios"
import USER_REGISTER from "../../../type/feature/mailToken/token_register.ts"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import REGISTER_RESPONSE from "../../../type/request/register_response.ts"
const API_URL: string  = import.meta.env.VITE_BACKEND_URL
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}

export const registerUser = async (userData: USER_REGISTER): Promise<{ response: REGISTER_RESPONSE, userData: { username?: string, email?: string } }> => {
    try {
        const response = await axios.post<REGISTER_RESPONSE>(`${API_URL}/register`, userData, config)

        return { response: response.data, userData }
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}
