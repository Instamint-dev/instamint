import axios from "axios"
import AXIOS_ERROR from "../../../../type/request/axios_error"
import EMAIL_RESPONSE_VERIFY from "../../../../type/request/email_response_verify"

const API_URL = "http://localhost:3333"
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
export const forgotPassword = async (email: String) : Promise<EMAIL_RESPONSE_VERIFY> => {
    try {
        const response = await axios.post<EMAIL_RESPONSE_VERIFY>(`${API_URL}/forgotPassword`, {
            email
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
