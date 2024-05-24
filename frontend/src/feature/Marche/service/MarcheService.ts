import Cookies from "universal-cookie";
import TokenAuth from "../../../type/feature/user/tokenAuth.ts";
import axios from "axios";
import AXIOS_ERROR from "../../../type/request/axios_error.ts";
import RequestsExchangeNFTResponse from "../../../type/feature/marche/RequestsExchangeNFT.ts";

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
export const exchangeNFT = async (nftId: number, nftIdExchange: number) => {
    try {
        const response = await axios.post(`${API_URL}/exchangeNFT`, {nftId,nftIdExchange}, config)
        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error("Error during exchange request")
        }
        else {
            throw new Error("Error during exchange request")
        }
    }
}

export const getRequestsChangeNfts = async () => {
    try {
        const response = await axios.post(`${API_URL}/getRequestsChangeNfts`,{}, config)

        return response.data as RequestsExchangeNFTResponse
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error("Error during exchange request")
        }
        else {
            throw new Error("Error during exchange request")
        }
    }
}

export const getRequestsChangeNftsSent = async () => {
    try {
        const response = await axios.post(`${API_URL}/getRequestsChangeNftsSent`,{}, config)
        return response.data as RequestsExchangeNFTResponse
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error("Error during exchange request")
        }
        else {
            throw new Error("Error during exchange request")
        }
    }
}