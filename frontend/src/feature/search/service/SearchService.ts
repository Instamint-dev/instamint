import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import Cookies from "universal-cookie"
import TokenAuth from "../../../type/feature/user/tokenAuth.ts"
import SEARCH_TYPE from "../../../type/feature/search/search.ts"
import defaultData from "../../../type/feature/search/defaultData.ts"
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
const getDefaultData = async (user:boolean,nft:boolean) : Promise<defaultData> =>{
    try {
        const response = await axios.post<defaultData>(`${API_URL}/getDefaultData`, {user,nft} ,config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}
const search = async (SEARCH_TYPE: SEARCH_TYPE) => {
    try {
        const response = await axios.post(`${API_URL}/search`, SEARCH_TYPE, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}

export { getDefaultData, search}