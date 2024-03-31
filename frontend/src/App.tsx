// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './feature/register/Register.tsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
}

export default App;
