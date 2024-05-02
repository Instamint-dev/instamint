import axios from "axios"
import AXIOS_ERROR from "../../../../type/request/axios_error.ts"
import Cookies from "universal-cookie"
import TokenAuth from "../../../../type/feature/user/tokenAuth.ts"
import ResponseSingleNFt from "../../../../type/feature/nft/ResponseSingleNFt.ts"
const cookies = new Cookies()
const authToken: TokenAuth | undefined = cookies.get("token") as TokenAuth | undefined
const API_URL: string  = import.meta.env.VITE_BACKEND_URL
const authorizationHeader = authToken ? authToken.headers.authorization : ""
const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": authorizationHeader,
    },
    withCredentials: true
}

export const getNFTsFeed = async (tab:string) => {
    try {
        const response = await axios.post(`${API_URL}/getNFTsFeed`, {}, config)

        return response.data as ResponseSingleNFt[]
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error updating draft")
        } else {
            throw new Error("Error updating draft")
        }
    }
}

export const compareImages = async (imageBase: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URL}/compareImages`, { imageBase }, config)

        return response.data as boolean
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error comparing images")
        } else {
            throw new Error("Error comparing images")
        }
    }
}