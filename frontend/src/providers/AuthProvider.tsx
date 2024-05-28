import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { loginUser,logoutUser,checkIsLogin } from "../feature/connection/service/ConnectionService"
import USER_CONNECTION from "../type/feature/user/user_connection"
import AUTH_CONTEXT_TYPE from "../type/feature/auth/auth_context"
import Cookies from "universal-cookie"
import CONNECTION_RESPONSE_LOGIN from "../type/request/connection_response_login"
import { checkDoubleAuthLogin } from "../feature/doubleAuth/service/doubleAuthService"
import { useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
const cookies = new Cookies()
const defaultContextValue: AUTH_CONTEXT_TYPE = {
    isAuthenticated: false,
    login: async (): Promise<CONNECTION_RESPONSE_LOGIN> => {
        await Promise.resolve()

        return { message: "" }
    },
    logout: async (): Promise<CONNECTION_RESPONSE_LOGIN> => { 
        await Promise.resolve()

        return { message: "" }
     },
    checkDoubleAuth: async (): Promise<CONNECTION_RESPONSE_LOGIN> => {
        await Promise.resolve()

        return { message: "" }
    },
}
const AUTH_CONTEXT = createContext<AUTH_CONTEXT_TYPE>(defaultContextValue)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const location = useLocation()
    const { i18n } = useTranslation()
    useEffect(() => {               
        const result = async () => {                        
                try {
                    const data = await checkIsLogin()                    
                    if (data.message) {
                        setIsAuthenticated(true)
                        i18n.changeLanguage(data.lang)
                    }else{
                        setIsAuthenticated(false)
                        cookies.remove("token", { path: "/" })
                    }
                } catch (error) {
                    setIsAuthenticated(false)
                    cookies.remove("token", { path: "/" })
                    throw new Error("Error")
                }
        }
        result().then(r => r).catch((e: unknown) => e)
    }, [location.pathname])
    const login = async (userData: USER_CONNECTION): Promise<CONNECTION_RESPONSE_LOGIN> => {
        const data = await loginUser(userData)
        if (data.message !== "2FA") {
            sessionStorage.removeItem("username")
            cookies.set("token", data.message, { path: "/", secure: true , sameSite: "none"})
            setIsAuthenticated(true)
        }
        
        return data
    }
    const logout = async (): Promise<CONNECTION_RESPONSE_LOGIN> => {
        const result = await logoutUser()
        if (result.message) {
            cookies.remove("token", { path: "/" })
            setIsAuthenticated(false)
        }
        
        return result
    }
    const checkDoubleAuth = async (code: string, username: string):Promise<CONNECTION_RESPONSE_LOGIN> => {
        const data = await checkDoubleAuthLogin(code, username)
        if (data.message) {
            setIsAuthenticated(true)
            sessionStorage.removeItem("username")
            cookies.set("token", data.message, { path: "/", secure: true , sameSite: "none"})
        }
        
        return data
    }

    return (
        <AUTH_CONTEXT.Provider value={{ isAuthenticated, login, logout, checkDoubleAuth }}>
            {children}
        </AUTH_CONTEXT.Provider>
    )
}

export const useAuth = () => useContext(AUTH_CONTEXT)