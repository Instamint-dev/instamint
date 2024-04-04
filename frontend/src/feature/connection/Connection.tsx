import  { useState, ChangeEvent, FormEvent } from "react"
import { loginUser } from "./service/ConnectionService.ts"
import USER_LOGIN from "../../type/user_connection.ts"
import AXIOS_ERROR from "../../type/axios_error.ts"

const ConnectionPage = () => {
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
            setSuccess("Successful connection. You are now connected")
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).response?.data?.message) {
                setError((err as AXIOS_ERROR).response?.data?.message || "Error connecting")
            } else {
                setError("Error connecting ")
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit">Connexion </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
        </div>
    )
}

export default ConnectionPage
