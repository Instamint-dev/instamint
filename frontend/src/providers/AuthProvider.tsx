import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { loginUser,logoutUser } from "../feature/connection/service/ConnectionService"
import USER_CONNECTION from "../type/feature/user/user_connection"
import AUTH_CONTEXT_TYPE from "../type/feature/auth/auth_context"
import Cookies from "universal-cookie"
const cookies = new Cookies()
const defaultContextValue: AUTH_CONTEXT_TYPE = {
    isAuthenticated: false,
    login: async (): Promise<void> => {
        await Promise.resolve()
    },
    logout: (): void => { void 0 },
}
const AUTH_CONTEXT = createContext<AUTH_CONTEXT_TYPE>(defaultContextValue)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    useEffect(() => {
        const token: boolean | undefined = cookies.get("token") as boolean | undefined
        setIsAuthenticated(Boolean(token))
    }, [])
    const login = async (userData: USER_CONNECTION) => {
        const data = await loginUser(userData)
        sessionStorage.setItem("login", userData.username)
        if (data.message) {
            cookies.set("token", data.message, { path: "/", secure: true , sameSite: "none"})
            setIsAuthenticated(true)
        }
    }
    const logout = async () => {
        const result = await logoutUser()
        if (result.message) {
            cookies.remove("token", { path: "/" })
            sessionStorage.removeItem("login")
            setIsAuthenticated(false)
        }
    }

    return (
        <AUTH_CONTEXT.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AUTH_CONTEXT.Provider>
    )
}

export const useAuth = () => useContext(AUTH_CONTEXT)