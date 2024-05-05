import axios from "axios"
import USER_LOGIN from "../../../type/feature/user/user_connection.ts"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import CONNECTION_RESPONSE from "../../../type/request/connection_response_login.ts"
import Cookies from "universal-cookie"
import TokenAuth from "../../../type/feature/user/tokenAuth"

const cookies = new Cookies()
const authToken: TokenAuth | undefined = cookies.get("token") as TokenAuth | undefined
const API_URL: string = import.meta.env.VITE_BACKEND_URL
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}
const loginUser = async (userData: USER_LOGIN) : Promise<CONNECTION_RESPONSE> =>{
    try {
        const { username, password } = userData
        sessionStorage.setItem("username", username)
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
const authorizationHeader = authToken ? authToken.headers.authorization : ""
const configLogout = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": authorizationHeader,
    },
    withCredentials: true
}
const logoutUser = async () : Promise<CONNECTION_RESPONSE> =>{
    try {
        const response = await axios.post<CONNECTION_RESPONSE>(`${API_URL}/logout`, {
        }, configLogout)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error("Error connecting")
        } else {
            throw new Error("Error connecting to server")
        }
    }
}
const checkIsLogin = async () : Promise<CONNECTION_RESPONSE> =>{
    try {
        const response = await axios.post<CONNECTION_RESPONSE>(`${API_URL}/checkIsLogin`, {
        }, configLogout)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            cookies.remove("token", { path: "/" })
            throw new Error("Error connecting")
        } else {
            throw new Error("Error connecting to server")
        }
    }
}
export { loginUser, logoutUser, checkIsLogin}
