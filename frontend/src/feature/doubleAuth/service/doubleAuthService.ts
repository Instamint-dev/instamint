import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error"
import EMAIL_RESPONSE_VERIFY from "../../../type/request/email_response_verify"
import Cookies from "universal-cookie"
import TokenAuth from "../../../type/feature/user/tokenAuth"

const cookies = new Cookies()
const API_URL = import.meta.env.VITE_BACKEND_URL
const authToken: TokenAuth = cookies.get('token')

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": authToken.headers.authorization,
    },
    withCredentials: true
}

export const generateQrCode = async (): Promise<EMAIL_RESPONSE_VERIFY> => {
    try {
        const response = await axios.post<EMAIL_RESPONSE_VERIFY>(`${API_URL}/generateQrCode`, {
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
