import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"
import { mintLink, homeLink, notificationLink, searchLink, newPostLink, editUser, registerUser } from "./tools/links"
const Navbar = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const redirectLogout = () => {
        navigate("/", { replace: true })
    }
    const authLinks = isAuthenticated ? (
        <>
            {mintLink()}
            {homeLink()}
            {notificationLink()}
            {searchLink()}
            {newPostLink()}
            {editUser()}
            <button onClick={() => {
                logout().then(() => {
                    redirectLogout()
                }).catch((error:unknown) => {
                    throw error
                })
            }}>Logout</button>        </>
    ) : (
        <>
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
