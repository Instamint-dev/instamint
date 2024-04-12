import axios from "axios"
import AXIOS_ERROR from "../../../../type/request/axios_error"
import REGISTER_RESPONSE from "../../../../type/request/register_response.ts"
const API_URL = "http://localhost:3333"
const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true
  }
const checkUserExist = async (username: string) : Promise<REGISTER_RESPONSE> => {
    try {
        const response = await axios.post<REGISTER_RESPONSE>(`${API_URL}/checkUserExist`, {username}, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}
const checkEmailExist = async (email: string) : Promise<REGISTER_RESPONSE> => {
    try {
        const response = await axios.post<REGISTER_RESPONSE>(`${API_URL}/checkEmailExist`, {email}, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}
const mailRegister = async (email: string) : Promise<REGISTER_RESPONSE> => {
    try {
        const response = await axios.post<REGISTER_RESPONSE>(`${API_URL}/mailRegister`, {email}, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}
export { checkUserExist, checkEmailExist, mailRegister}