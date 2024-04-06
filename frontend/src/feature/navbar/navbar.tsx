import { Link } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"


const Navbar = () => {
    const { isAuthenticated,logout } = useAuth()
    const authLinks = isAuthenticated ? (
        <>
            {mintLink()}
            {homeLink()}
            {notificationLink()}
            {searchLink()}
            {newPostLink()}
            <button onClick={logout}>Logout</button>
        </>
    ) : (
        <>
        {registerLink()}
        </>

    )
    
    return (
        <div>
            <header className="flex items-center justify-between p-4 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800">
                <Link to="/"><h1 className="text-2xl font-bold">Instamint</h1></Link>
                <nav className="flex gap-4">
                    {authLinks}
                </nav>
            </header>
        </div>
    )
}
function notificationLink() {
    return (
        <Link to="/">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="w-6 h-6 text-gray-400 dark:text-gray-600">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
        </Link>
    )
}
function searchLink() {
    return (
        <Link to="/">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="w-6 h-6 text-gray-400 dark:text-gray-600">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
            </svg>
        </Link>
    )
}
function newPostLink() {
    return (
        <Link to="/">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="w-6 h-6 text-gray-400 dark:text-gray-600">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
            </svg>
        </Link>
    )
}

function mintLink() {
    return (
        <Link to="/">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-6 w-6">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
        </Link>
    )
}
function homeLink() {
    return (
        <Link to="/">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="w-6 h-6 text-gray-400 dark:text-gray-600">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
        </Link>
    )
}
function registerLink() {
    return (
        <Link to="/register">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="w-6 h-6 text-gray-400 dark:text-gray-600">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        </Link>
    )
}
export default Navbar

