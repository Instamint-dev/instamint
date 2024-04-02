// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './feature/register/Register.tsx';
import LoginPage from "./feature/login/Login.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
