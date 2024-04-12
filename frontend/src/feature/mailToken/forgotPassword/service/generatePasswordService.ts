import axios from "axios"
import AXIOS_ERROR from "../../../../type/request/axios_error"
import FORGET_PASSWORD_TOKEN_VERIFY from "../../../../type/request/forget_password_token_verify"

const API_URL = "http://localhost:3333"
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
// export const generatePassword = async (email: String) : Promise<EMAIL_RESPONSE_VERIFY> => {
//     try {
//         const response = await axios.post<EMAIL_RESPONSE_VERIFY>(`${API_URL}/generatePassword`, {
//             email
//         }, config)

//         return response.data
//     } catch (err: unknown) {
//         if ((err as AXIOS_ERROR).message) {
//             throw new Error((err as AXIOS_ERROR).message || "Error connecting")
//         } else {
//             throw new Error("Error connecting to server")
//         }
//     }
// }
export const checkTokenValid = async (token: String) : Promise<FORGET_PASSWORD_TOKEN_VERIFY> => {
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