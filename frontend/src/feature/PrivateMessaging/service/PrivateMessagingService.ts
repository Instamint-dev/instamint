import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import TokenAuth from "../../../type/feature/user/tokenAuth.ts";
import Cookies from "universal-cookie";
import UserFollowList from "../../../type/feature/PrivateMessaging/UserFollowList.ts";
const API_URL: string  = import.meta.env.VITE_BACKEND_URL
const cookies = new Cookies()
const authToken: TokenAuth | undefined = cookies.get("token") as TokenAuth | undefined
const authorizationHeader = authToken ? authToken.headers.authorization : ""
const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": authorizationHeader,
    },
    withCredentials: true
}

export const getListMessages= async () => {
    try {
        const response = await axios.post(`${API_URL}/getListMessages`,{}, config)
        return response.data as ResponsePreviewMessage[]
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }

}

export const getMessageWithUser= async (otherId: number) => {
    try {
        const response = await axios.post(`${API_URL}/getMessageWithUser`, {otherId}, config)
        return response.data as ResponseMessageWithUser[]
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error loading messages")
        } else {
            throw new Error("Error loading messages")
        }
    }
}

export const sendMessage= async (otherId: number, content: string) => {
    try {
        const response=await axios.post(`${API_URL}/sendMessage`, {otherId, content}, config)
        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during sending message")
        } else {
            throw new Error("Error during sending message")
        }
    }
}

export const searchUserFollow= async (search: string|null) => {
    try {
        const response = await axios.post(`${API_URL}/searchUserMessage`, {search}, config)
        return response.data as UserFollowList
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during search")
        } else {
            throw new Error("Error during search")
        }
    }
}