import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"
import {privateMessage, notificationLink, searchLink, newPostLink, editUser, registerUser, teaBag} from "./tools/links"
import AXIOS_ERROR from "../../type/request/axios_error"
import { useTranslation } from "react-i18next"

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const redirectLogout = async () => {
        try {
            const response = await logout()
            if (response.message) {
                navigate("/", { replace: true })
            }
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                throw new Error("Error connecting")
            } else {
                throw new Error("Error connecting to server")
            }
        }
    }
    const handleLogout = async () => {
        try {
            await redirectLogout()
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                throw new Error("Error connecting")
            } else {
                throw new Error("Error connecting to server")
            }
        }
    }
    const { i18n, t } = useTranslation()
    const authLinks = isAuthenticated ? (
        <>
            {teaBag()}
            {privateMessage()}
            {notificationLink()}
            {newPostLink()}
            {editUser()}
            <button onClick={handleLogout}>{t("Logout")}</button>
        </>
    ) : (
        <>
            <Link to="/language">[{i18n.language}]</Link>
            {registerUser(t("Login"))}
        </>
    )

    return (
        <div>
            <header className="flex items-center justify-between p-4 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800">
                <Link to="/"><h1 className="text-2xl font-bold">Instamint</h1></Link>
                <nav className="flex gap-4">{searchLink()}{authLinks}</nav>
            </header>
        </div>
    )
}

export default Navbar