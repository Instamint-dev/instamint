import ResponseNFT from "../../../../type/feature/nft/NFT.ts"
import axios from "axios"
import Cookies from "universal-cookie"
import AXIOS_ERROR from "../../../../type/request/axios_error.ts"

import TokenAuth from "../../../../type/feature/user/tokenAuth.ts"
import {CommentsTypeResponse} from "../../../../type/feature/nft/CommentsType.ts"
import CommentOptions from "../../../../type/feature/nft/CommentOptions.ts"
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
export const getDraftsCompleted = async (): Promise<ResponseNFT> => {
    try {
        const response = await axios.post(`${API_URL}/getDraftsCompleted`, {  }, config)

        return response.data as ResponseNFT
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting drafts")
        } else {
            throw new Error("Error getting drafts")
        }
    }
}

export const getDraftsPost = async (): Promise<ResponseNFT> => {
    try {
        const response = await axios.post(`${API_URL}/getDraftsPost`, {  }, config)

        return response.data as ResponseNFT
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting drafts")
        } else {
            throw new Error("Error getting drafts")
        }
    }
}

export const likeNFT = async (idNFT:number): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URL}/likeNFT`, {  idNFT }, config)

        return response.status === 200
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting drafts")
        } else {
            throw new Error("Error getting drafts")
        }
    }
}

export const getCommentsNFT = async (idNFT: number): Promise<CommentsTypeResponse> => {
    try {
        const response = await axios.post(`${API_URL}/getCommentsNFT`, { idNFT }, config)

        return response.data as CommentsTypeResponse
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting drafts")
        } else {
            throw new Error("Error getting drafts")
        }
    }
}

export const addCommentNFT = async ({ idNFT, message, idParentCommentary, mentions }: CommentOptions): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URL}/addCommentNFT`, { idNFT, message, idParentCommentary,mentions }, config)

        return response.status === 200
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting drafts")
        } else {
            throw new Error("Error getting drafts")
        }
    }
}

export const deleteCommentNFT = async (idComment: number): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_URL}/deleteCommentNFT`, { idComment }, config)

        return response.status === 200
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting drafts")
        } else {
            throw new Error("Error getting drafts")
        }
    }
}