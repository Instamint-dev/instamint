import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error.ts"
import ResponseNFT from "../../../type/feature/nft/NFT.ts"
import FormNFT from "../../../type/feature/nft/FormNFT.ts"
import ResponseSingleNFT from "../../../type/feature/nft/ResponseSingleNFt.ts"
import TokenAuth from "../../../type/feature/user/tokenAuth.ts"
import Cookies from "universal-cookie"
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
    try {
        const response = await axios.post(`${API_URL}/getNFTsByUser`, {  }, config)

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

export const getDraftWithId = async (id: number): Promise<ResponseSingleNFT> => {
    try {
        const response = await axios.post(`${API_URL}/getDraftNFT`, {id}, config)


        return response.data as ResponseSingleNFT
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting draft")
        } else {
            throw new Error("Error getting draft")
        }
    }
}

export const updateDraft = async (formData: FormNFT): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URL}/updateDraftNFT`, formData, config)

        return response.status === 200
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error updating draft")
        } else {
            throw new Error("Error updating draft")
        }
    }
}

export const compareImages = async (image1: string): Promise<boolean> => {
    const username = sessionStorage.getItem("login")
    try {
        const response = await axios.post(`${API_URL}/compareImages`, { image1,username }, config)

        return response.data as boolean
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error comparing images")
        } else {
            throw new Error("Error comparing images")
        }
    }
}

export const searchNFt = async (search: string ): Promise<ResponseSingleNFT> => {
    try {
        const response = await axios.post(`${API_URL}/searchNFT`, { search }, config)

        return response.data as ResponseSingleNFT
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error searching NFT")
        } else {
            throw new Error("Error searching NFT")
        }
    }
}


