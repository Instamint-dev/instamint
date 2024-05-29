import { AuthProvider } from "./providers/AuthProvider.tsx"
import Rooter from "./Rooter.tsx"
import { BrowserRouter as Router } from "react-router-dom"
import "./i18n"
function App() {
    return (
        <Router>
            <AuthProvider>
                <Rooter />
            </AuthProvider>
        </Router>    
    )
}

export default App
