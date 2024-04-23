import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import ResponseNFT from "../../../type/feature/nft/NFT.ts"
import FormNFT from "../../../type/feature/nft/FormNFT.ts"

const API_URL: string  = import.meta.env.VITE_BACKEND_URL
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}

export const registerDraft = async (formData: FormNFT): Promise<boolean> => {
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



export const getDrafts = async (): Promise<ResponseNFT> => {
    const username = sessionStorage.getItem("login")
    try {
        const response = await axios.post(`${API_URL}/getNFTsByUser`, { username }, config)

        return response.data as ResponseNFT
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting drafts")
        } else {
            throw new Error("Error getting drafts")
        }
    }
}

export const deleteDraft = async (id: number): Promise<boolean> => {

    try {
        const response = await axios.post(`${API_URL}/deleteDraftNFT`, {id} , config)

        return response.status === 200
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error deleting draft")
        } else {
            throw new Error("Error deleting draft")
        }
    }
}


