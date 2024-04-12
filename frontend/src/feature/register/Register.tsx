import { useState, ChangeEvent, FormEvent } from "react"
import { registerUser } from "./service/RegisterService"
import USER_REGISTER from "../../type/feature/user/user_register.ts"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import Navbar from "../navbar/navbar.tsx"
import {Link, Navigate} from "react-router-dom"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"

const RegisterPage = () => {
    const [formData, setFormData] = useState<USER_REGISTER>({
        username: "",
        email: "",
        password: ""
    })
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError("")
        if (e.target.value === "") {
            setError("Please fill in all fields")
        }
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        try {
            await registerUser(formData)
            setSuccess("Successful registration. You can now connect")
            setRedirect(true)
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {               
                setError((err as AXIOS_ERROR).message || "Error during registration")
            } else {
                setError("Error during registration")
            }
        }
    }

    if (redirect) {
        return <Navigate to="/editUser" />;
    }
    
    return (
        <div><Navbar />
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                <h1 className="font-bold flex justify-center">Register</h1>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="username">Username</CustomLabelForm>
                        <CustomInput type="text" id="username" name="username" value={formData.username || ""} onChange={handleChange} placeholder="Username" /></div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="email">Email</CustomLabelForm>
                        <CustomInput type="email" id="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" /></div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="password">Password</CustomLabelForm>
                        <CustomInput type="password" id="password" name="password" value={formData.password || ""} onChange={handleChange} placeholder="Password" /></div>
                    <div className="my-2">
                        <CustomButton value="Sign up" type="submit" />
                    </div>
                    <div className="my-2">
                        <p>Already have an account? Log in at</p>
                        <div className="flex justify-end">
                        <Link to="/connection">
                            <CustomButton value="Sign up" type="button" />
                        </Link>
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}{success && <p className="text-green-500">{success}</p>}
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
