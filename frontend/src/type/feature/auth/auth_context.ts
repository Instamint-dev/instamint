import USER_CONNECTION from "../user/user_connection"

interface auth_context {
    isAuthenticated: boolean
    login: (userData: USER_CONNECTION) => Promise<void>
    logout: () => void
}

export default auth_context