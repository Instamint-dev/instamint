import { useState, ChangeEvent, FormEvent } from "react"
import USER_LOGIN from "../../type/feature/user/user_connection.ts"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import Navbar from "../navbar/navbar.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider.tsx"

function forgotPassword() {
    return (
        <div className="my-2">
            <Link to="/forgot-password">
                <p className="text-blue-500">Forgot your password</p>
            </Link>
        </div>
    )
}
function registerLink() {
    return (
        <div className="my-2">
            <p>Don't have an account yet ? Register at</p>
            <div className="flex justify-end">
                <Link to="/register">
                    <CustomButton value="Sign up" type="button" />
                </Link>
            </div>
        </div>
    )
}

const ConnectionPage = () => {
    const [formData, setFormData] = useState<USER_LOGIN>({username: "", password: ""})
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {setFormData({ ...formData, [e.target.name]: e.target.value })}
    const { login } = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            const response = await login(formData)
            if (response.message === "2FA") {
                navigate("/double-auth")
            }
            else{
                if (response.message) {
                    setSuccess("Successful connection. You are now connected")
                    location.href = "/"
                }

                setSuccess("")
                setError("Email or password incorrect")
            }
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                setError((err as AXIOS_ERROR).message || "Error connecting")
            } else {
                setError("Error connecting ")
            }
        }
    }

    return (
        <div><Navbar />
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <h1 className="font-bold flex justify-center">Login</h1>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="username">Username</CustomLabelForm>
                        <CustomInput disabled={false} id="username" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                    </div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="password">Password</CustomLabelForm>
                        <CustomInput disabled={false} id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                    </div>
                    {forgotPassword()}

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <div className="my-2">
                        <CustomButton value="Sign in" type="submit" />
                    </div>
                    {registerLink()}
                </form>
            </div>
        </div>
    )
}

export default ConnectionPage
