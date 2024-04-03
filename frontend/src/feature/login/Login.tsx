import  { useState, ChangeEvent, FormEvent } from "react"
import { loginUser } from "./service/LoginService"
import USER_LOGIN from "../../type/user_login.ts"
import AXIOS_ERROR from "../../type/axios_error.ts"

const LoginPage = () => {
    const [formData, setFormData] = useState<USER_LOGIN>({
        username: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            await loginUser(formData)
            setSuccess("Connexion réussie. Vous êtes maintenant connecté")
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).response?.data?.message) {
                setError((err as AXIOS_ERROR).response?.data?.message || "Erreur lors de la connexion")
            } else {
                setError("Erreur lors de la connexion")
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
                <button type="submit">Connexion </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    )
}

export default LoginPage
