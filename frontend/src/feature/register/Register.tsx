import { useState, ChangeEvent, FormEvent } from "react"
import { registerUser } from "./service/RegisterService"
import USER_REGISTER from "../../type/user_register.ts"
import AXIOS_ERROR from "../../type/axios_error.ts"
import Navbar from "../navbar/navbar.tsx"
import { Link } from "react-router-dom"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"

const RegisterPage = () => {
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
            setSuccess("Successful registration. You can now connect")
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).response?.data?.message) {
                setError((err as AXIOS_ERROR).response?.data?.message || "Error during registration")
            } else {
                setError("Error during registration")
            }
        }
    }
    
    return (
        <div><Navbar />
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="username">Username</CustomLabelForm>
                        <CustomInput type="text" id="username" name="username" value={formData.username || ""} onChange={handleChange} placeholder="Username" /></div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="email">Email</CustomLabelForm>
                        <CustomInput type="email" id="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" /></div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="password">Password</CustomLabelForm>
                        <CustomInput type="password" id="password" name="password" value={formData.password || ""} onChange={handleChange} placeholder="Password" /></div>
                    <div className="flex items-center justify-between my-2">
                        <CustomButton value="Sign up" type="submit" />
                        <Link to="/connection">
                            <CustomButton value="Sign in" type="button" />
                        </Link></div>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}{success && <p style={{ color: "green" }}>{success}</p>}
            </div>
        </div>
    )
}

export default RegisterPage
