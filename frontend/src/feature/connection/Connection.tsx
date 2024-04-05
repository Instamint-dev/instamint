import { useState, ChangeEvent, FormEvent } from "react"
import { loginUser } from "./service/ConnectionService.ts"
import USER_LOGIN from "../../type/user_connection.ts"
import AXIOS_ERROR from "../../type/axios_error.ts"
import Navbar from "../navbar/navbar.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import { Link } from "react-router-dom"

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
            <Navbar />
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="username">Username</CustomLabelForm>
                        <CustomInput id="username" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                    </div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="password">Password</CustomLabelForm>
                        <CustomInput id="password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                    </div>
                    <div className="flex items-center justify-between my-2">
                        <CustomButton value="Sign in" type="submit" />
                        <Link to="/register">
                            <CustomButton value="Sign up" type="button" />
                        </Link>
                    </div>
                </form>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}</div>
    )
}

export default ConnectionPage
