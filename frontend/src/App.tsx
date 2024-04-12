import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterPage from "./feature/register/Register.tsx"
import HomePage from "./feature/Home.tsx"
import ConnectionPage from "./feature/connection/Connection.tsx"
import { AuthProvider } from "./providers/AuthProvider.tsx"
import EditUser from "./feature/EditUser/EditUser.tsx"

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/connection" element={<ConnectionPage />} />
                    <Route path="/register" element={<RegisterPage/>} />
                    <Route path="/editUser" element={<EditUser />} />
                </Routes>
            </Router>
        </AuthProvider>

    )
}

export default App
