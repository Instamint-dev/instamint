import axios from "axios"
import USER_LOGIN from "../../../type/feature/user/user_connection.ts"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import CONNECTION_RESPONSE from "../../../type/request/connection_response_login.ts"
const API_URL = import.meta.env.VITE_BACKEND_URL

const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
export const loginUser = async (userData: USER_LOGIN) : Promise<CONNECTION_RESPONSE> => {
    try {
        const { username, password } = userData
        const response = await axios.post<CONNECTION_RESPONSE>(`${API_URL}/connection`, {
            username,
            password
        }, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error("Error connecting")
        } else {
            throw new Error("Error connecting to server")
        }
    }
}
