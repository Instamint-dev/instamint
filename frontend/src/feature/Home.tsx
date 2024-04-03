import { Link } from "react-router-dom"
const HomePage = () => (
    <>
        <h1>Home Page</h1>
        <Link to="/register">
            <button>Register</button>
        </Link>
        <Link to="/login">
            <button>Login</button>
        </Link>
    </>
)
export default HomePage