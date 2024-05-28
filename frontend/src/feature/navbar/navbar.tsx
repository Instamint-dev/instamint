import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"
import {
    privateMessage,
    notificationLink,
    searchLink,
    newPostLink,
    editUser,
    registerUser,
    teaBag
} from "./tools/links"
import AXIOS_ERROR from "../../type/request/axios_error"
import { useState } from "react"

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
            {teaBag()}
            {privateMessage()}
            {notificationLink()}
            {newPostLink()}
            {editUser()}
            <button onClick={handleLogout} className="text-sm md:text-base">Logout</button>
        </>
    ) : (
        <>
            {registerUser()}
        </>
    )

    return (
        <div>
            <header className="flex items-center justify-between p-2 md:p-4 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800">
                <Link to="/"><h1 className="text-xl md:text-2xl font-bold">Instamint</h1></Link>
                <div className="md:hidden">
                    <button
                        onClick={() => {setIsMenuOpen(!isMenuOpen)}}
                        className="text-white dark:text-gray-800 focus:outline-none"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <nav className="hidden md:flex gap-2 md:gap-4">{searchLink()}{authLinks}</nav>
            </header>
            {isMenuOpen && (
                <div className="fixed top-0 right-0 h-full w-48 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 p-4 z-50">
                    <button
                        onClick={() => {setIsMenuOpen(false)}}
                        className="absolute top-4 right-4 text-white dark:text-gray-800 focus:outline-none"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <nav className="flex flex-col gap-4 mt-8">
                        {searchLink()}
                        {authLinks}
                    </nav>
                </div>
            )}
        </div>
    )
}

export default Navbar
