import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterPage from "./feature/register/Register.tsx"
import LoginPage from "./feature/login/Login.tsx"
import HomePage from "./feature/Home.tsx"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage/>} />
            </Routes>
        </Router>
    )
}

export default App
