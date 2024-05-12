import TokenAuth from "../../../type/feature/user/tokenAuth.ts"
import Cookies from "universal-cookie"
import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import TeaBag from "../../../type/feature/teabag/teabag_profil.ts"

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

export const createTeaBag = async (teaBag:TeaBag) : Promise<boolean> =>{
    try {
        const response = await axios.post(`${API_URL}/createTeaBag`, { teaBag }, config)

        return response.status === 200
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}

export const getTeaBag = async () : Promise<TeaBag[]> =>{
    try {
        const response = await axios.post(`${API_URL}/getTeaBags`, {}, config)

        return response.data as TeaBag[]
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}

export const getMyTeaBag = async () : Promise<TeaBag[]> =>{
    try {
        const response = await axios.post(`${API_URL}/getMyTeaBags`, {}, config)

        return response.data as TeaBag[]
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}

export const updateTeaBag = async (teaBag:TeaBag) : Promise<boolean> =>{
    try {
        const response = await axios.post(`${API_URL}/updateTeaBag`, {teaBag} , config)

        return response.status === 200
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}

export const deleteUser = async (id:number) : Promise<boolean> =>{
    try {
        const response = await axios.post(`${API_URL}/deleteUser`, {id} , config)

        return response.status === 200
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error during registration")
        } else {
            throw new Error("Error during registration")
        }
    }
}