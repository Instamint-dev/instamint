import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="h-full w-64 bg-gray-800 text-white fixed">
            <ul>
                <li className="p-4 hover:bg-gray-700">
                    <Link to="/editUser">My profile</Link>
                </li>
                <li className="p-4 hover:bg-gray-700">
                    <Link to="/doubleFA">2FA</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
