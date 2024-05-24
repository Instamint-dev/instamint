import { Link } from "react-router-dom"
import { useState } from "react"

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <button onClick={toggleSidebar} className={`${isOpen ? "w-64" : "w-16 h-16"} bg-gray-700 hover:bg-gray-600`}>
                {isOpen ? "<<" : ">>"}
            </button>
            <div className={`h-full ${isOpen ? "w-64" : "w-0"} z-20 overflow-hidden bg-gray-800 text-white fixed transition-width duration-300`}>

                <ul>
                    <li className="p-4 hover:bg-gray-700">
                        <Link to="/me">My profile</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link to="/editUser">Edit profile</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link to="/doubleFA">2FA</Link>
                    </li>

                    <li className="p-4 hover:bg-gray-700">
                        <Link to="/nft">NFT</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link to="/notifications-settings">Notifications</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700">
                        <Link to="/language">Language</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar
