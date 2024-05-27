import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import Cookies from "universal-cookie"
import TokenAuth from "../../../type/feature/user/tokenAuth.ts"

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

const saveLang = async (lang:string) => {
    try {
        const response = await axios.post<string>(`${API_URL}/saveLang`, {lang:lang}, config)

        return response.data
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error editing user profile")
        }
    }
}

export { saveLang }