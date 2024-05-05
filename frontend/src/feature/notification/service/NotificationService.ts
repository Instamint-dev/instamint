import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import Cookies from "universal-cookie"
import TokenAuth from "../../../type/feature/user/tokenAuth.ts"
import NOTIFICATION_RESPONSE from "../../../type/request/notification_response.ts"
const cookies = new Cookies()
const authToken: TokenAuth | undefined = cookies.get("token") as TokenAuth | undefined
const API_URL: string = import.meta.env.VITE_BACKEND_URL
const authorizationHeader = authToken ? authToken.headers.authorization : ""
const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": authorizationHeader,
    },
    withCredentials: true
}
const getNotifications = async () : Promise<NOTIFICATION_RESPONSE[]> =>{
    try {
        const response = await axios.post<NOTIFICATION_RESPONSE[]>(`${API_URL}/getNotifications`, { }, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}

export { getNotifications }