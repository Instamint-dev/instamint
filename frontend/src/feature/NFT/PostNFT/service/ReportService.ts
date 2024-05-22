import Cookies from "universal-cookie"
import TokenAuth from "../../../../type/feature/user/tokenAuth.ts"
import axios from "axios"
import AXIOS_ERROR from "../../../../type/request/axios_error.ts"
import ReportType from "../../../../type/feature/report/ReportType.ts"
import ResponseReport from "../../../../type/feature/report/ResponseReport.ts"
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

export const addReport = async (report:ReportType)=> {
    try {
        const response = await axios.post(`${API_URL}/addReport`, {report}, config)

        return response.data as ResponseReport
    } catch (error) {
        if ((error as AXIOS_ERROR).message) {
            throw new Error("Error getting drafts")
        } else {
            throw new Error("Error getting drafts")
        }
    }
}