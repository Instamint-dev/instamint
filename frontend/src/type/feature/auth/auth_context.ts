import USER_CONNECTION from "../user/user_connection"
import CONNECTION_RESPONSE_LOGIN from "../../request/connection_response_login"
interface auth_context {
    isAuthenticated: boolean
    login: (userData: USER_CONNECTION) => Promise<CONNECTION_RESPONSE_LOGIN>
    logout: () => Promise<CONNECTION_RESPONSE_LOGIN>
    checkDoubleAuth: (code: string, username: string) => Promise<CONNECTION_RESPONSE_LOGIN>
}

export default auth_context