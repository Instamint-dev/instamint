import GeneratePassword from "./feature/mailToken/forgotPassword/GeneratePassword.tsx"
import RegisterToken from "./feature/mailToken/registerToken/registerToken.tsx"
import ForgotPassword from "./feature/mailToken/forgotPassword/ForgotPassword.tsx"
import EditUser from "./feature/EditUser/EditUser.tsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterPage from "./feature/register/Register.tsx"
import HomePage from "./feature/Home.tsx"
import ConnectionPage from "./feature/connection/Connection.tsx"
import { useAuth } from "./providers/AuthProvider.tsx"

const Rooter = () => {
    const { isAuthenticated } = useAuth()

    return (
        <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            {isAuthenticated  ? 
            <>
                <Route path="/editUser" element={<EditUser />} />
            </>
            :
            <>
                <Route path="/connection" element={<ConnectionPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/generate-password/:id" element={<GeneratePassword />} />
                <Route path="/register_token/:id" element={<RegisterToken />} />
            </>

            }
        </Routes>
    </Router>

    )
}

export default Rooter