import axios from "axios"
import AXIOS_ERROR from "../../../../type/request/axios_error"
import FORGET_PASSWORD_TOKEN_VERIFY from "../../../../type/request/forget_password_token_verify"
import EMAIL_RESPONSE_VERIFY from "../../../../type/request/email_response_verify"
import TOKEN_PASSWORD_TYPE from "../../../../type/feature/mailToken/token_password"

const API_URL = import.meta.env.VITE_BACKEND_URL
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
export const savePassword = async (TOKEN_PASSWORD:TOKEN_PASSWORD_TYPE) : Promise<EMAIL_RESPONSE_VERIFY> => {
    try {
        const response = await axios.post<EMAIL_RESPONSE_VERIFY>(`${API_URL}/generatePassword`, {
            TOKEN_PASSWORD
        }, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error connecting")
        } else {
            throw new Error("Error connecting to server")
        }
    }
}

export const checkTokenValid = async (token: string) : Promise<FORGET_PASSWORD_TOKEN_VERIFY> => {
    try {
        const response = await axios.post<FORGET_PASSWORD_TOKEN_VERIFY>(`${API_URL}/checkTokenValid`, {
            token
        }, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error connecting")
        } else {
            throw new Error("Error connecting to server")
        }
    }
}