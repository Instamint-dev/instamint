import axios from "axios"
import USER_LOGIN from "../../../type/user_connection.ts"
import AXIOS_ERROR from "../../../type/axios_error.ts"
import CONNECTION_RESPONSE from "../../../type/connection_response.ts"
const API_URL = "http://localhost:3333"
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
export const loginUser = async (userData: USER_LOGIN) : Promise<CONNECTION_RESPONSE> => {
    try {
        const { username, password } = userData
        const response = await axios.post(`${API_URL}/connection`, {
            username,
            password
        }, config)
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token as string)
        }

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).response?.data?.message) {
            throw new Error((err as AXIOS_ERROR).response?.data?.message || "Error connecting")
        } else {
            throw new Error("Error connecting to server")
        }
    }
}
