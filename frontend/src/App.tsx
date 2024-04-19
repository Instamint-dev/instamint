import { AuthProvider } from "./providers/AuthProvider.tsx"
import Rooter from "./Rooter.tsx"

function App() {
    return (
        <AuthProvider>
            <Rooter />
        </AuthProvider>
    )
}

export default App
