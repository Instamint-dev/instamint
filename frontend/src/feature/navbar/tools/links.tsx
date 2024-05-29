import {Link} from "react-router-dom"
function notificationLink() {
    return (
        <Link to="/notifications">
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
        <Link to="/search">
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
        <Link to="/postNFT">
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

function privateMessage() {
    return (
        <Link to="/messages">
            <svg
                className="w-6 h-6 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </svg>
        </Link>
    )
}

function editUser() {
    return (
        <Link to="/editUser">
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

function teaBag() {
    return (
        <Link to="/teaBag">
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-gray-400 dark:text-gray-600"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
        </Link>
    )
}

function registerUser(login:string) {
    return (
        <Link to="/register"><p>{login}</p></Link>
    )
}
export {notificationLink, searchLink, newPostLink, privateMessage, editUser, registerUser, teaBag}