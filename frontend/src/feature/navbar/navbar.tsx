import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"
import { mintLink, notificationLink, searchLink, newPostLink, editUser, registerUser } from "./tools/links"
import AXIOS_ERROR from "../../type/request/axios_error"

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
    const authLinks = isAuthenticated ? (
        <>
            {mintLink()}
            {notificationLink()}
            {newPostLink()}
            {editUser()}
            <button onClick={handleLogout}>Logout</button>
        </>
    ) : (
        <>
            {searchLink()}
            {registerUser()}
        </>
    )

    return (
        <div>
            <header className="flex items-center justify-between p-4 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800">
                <Link to="/"><h1 className="text-2xl font-bold">Instamint</h1></Link>
                <nav className="flex gap-4">{authLinks}</nav>
            </header>
        </div>
    )
}

export default Navbar