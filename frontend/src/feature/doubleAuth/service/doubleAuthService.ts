import axios from "axios"
import AXIOS_ERROR from "../../../type/request/axios_error"
import EMAIL_RESPONSE_VERIFY from "../../../type/request/email_response_verify"
import Cookies from "universal-cookie"
import TokenAuth from "../../../type/feature/user/tokenAuth"
import QR_CODE from "../../../type/request/qr_code"

const cookies = new Cookies()
const API_URL = import.meta.env.VITE_BACKEND_URL
const authToken: TokenAuth = cookies.get('token') || { headers : { authorization: ""}}

const config = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": authToken.headers.authorization,
    },
    withCredentials: true
}

const generateQrCode = async (): Promise<QR_CODE> => {
    try {
        const response = await axios.post<QR_CODE>(`${API_URL}/generateQrCode`, {
        }, config)
        
        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error connecting")
        } else {
            throw new Error("Error connecting to server")
        }
    }
}

const checkDOubleAuth = async (code: string, recoveryCode: string): Promise<EMAIL_RESPONSE_VERIFY> => {
    try {
        const response = await axios.post<EMAIL_RESPONSE_VERIFY>(`${API_URL}/checkDoubleAuth`, {
            code,
            recoveryCode
        }, config)
        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error connecting")
        } else {
            throw new Error("Error connecting to server")
        }
    }
}

const doubleAuthEnable = async (): Promise<EMAIL_RESPONSE_VERIFY> => {
    try {
        const response = await axios.post<EMAIL_RESPONSE_VERIFY>(`${API_URL}/doubleAuthEnable`, {
        }, config)
        return response.data
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error connecting")
        } else {
            throw new Error("Error connecting to server")
        }
    }
}

export { generateQrCode, checkDOubleAuth, doubleAuthEnable }