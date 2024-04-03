import React, { useState, ChangeEvent, FormEvent } from "react"
import { registerUser } from "./service/RegisterService"
import USER_REGISTER from "../../type/user_register.ts"
import AXIOS_ERROR from "../../type/axios_error.ts"

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<USER_REGISTER>({
        username: "",
        email: "",
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
            await registerUser(formData)
            setSuccess("Inscription réussie. Vous pouvez maintenant vous connecter.")
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
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
                <button type="submit">S"inscrire</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    )
}

export default RegisterPage
