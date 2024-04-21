import axios from "axios";
import AXIOS_ERROR from "../../../type/request/axios_error.ts";
const API_URL: string  = import.meta.env.VITE_BACKEND_URL

const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}

export const registerDraft = async (formData:FormNFT):Promise<boolean> => {

    try {
        const response = await axios.post(`${API_URL}/registerDraftNFT`, formData ,config)

        return response.status === 200
    } catch (error:unknown) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error( "Error while adding draftg ")
        } else {
            throw new Error("Error while adding draft")
        }
    }
}


export const getDrafts = async () => {
    const username = sessionStorage.getItem("login")
    try {
        const response = await axios.post(`${API_URL}/getNFTsByUser`,{username}, config)
        return response.data
    } catch (error:unknown) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting drafts")
        } else {
            throw new Error("Error getting drafts")
        }
    }
}