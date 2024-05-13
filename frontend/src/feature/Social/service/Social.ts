import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import Cookies from "universal-cookie"
import TokenAuth from "../../../type/feature/user/tokenAuth.ts"
import User from "../../../type/request/User.ts"
import FOLLOW_RESPONSE from "../../../type/request/follow_response.ts"
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
const getUser = async (link: string) : Promise<User> =>{
    try {
        const response = await axios.post<User>(`${API_URL}/getUser`, { link }, config)

        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}
const followInformations = async (link: string) : Promise<FOLLOW_RESPONSE> =>{
    try {
        const follow = await axios.post<FOLLOW_RESPONSE>(`${API_URL}/followInformations`, { link }, config)

        return follow.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}
const followUser = async (link: string,etat:number) : Promise<FOLLOW_RESPONSE> =>{
    try {
        const follow = await axios.post<FOLLOW_RESPONSE>(`${API_URL}/followUser`, { link, etat }, config)

        return follow.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}

const followUserTeaBag = async (link: string,etat:number,idNotification:number) : Promise<FOLLOW_RESPONSE> =>{
    try {
        const follow = await axios.post<FOLLOW_RESPONSE>(`${API_URL}/followUserTeaBag`, { link, etat,idNotification }, config)

        return follow.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}
const isFollowPrivate = async (link:string) : Promise<FOLLOW_RESPONSE> =>{
    try {
        const follow = await axios.post<FOLLOW_RESPONSE>(`${API_URL}/isFollowPrivate`, {link}, config)

        return follow.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}

const joinTeaBag = async (link: string) : Promise<FOLLOW_RESPONSE> =>{
    try {
        const follow = await axios.post<FOLLOW_RESPONSE>(`${API_URL}/joinTeaBag`, { link }, config)

        return follow.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }

}

export { getUser, followInformations, followUser, isFollowPrivate,joinTeaBag,followUserTeaBag}