import { useState, ChangeEvent, FormEvent } from "react"
import { checkEmailExist, mailRegister } from "../mailToken/registerToken/service/registerTokenService.ts"
import USER_REGISTER from "../../type/feature/user/user_register.ts"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import Navbar from "../navbar/navbar.tsx"
import { Link } from "react-router-dom"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"

const RegisterPage = () => {
    const [formData, setFormData] = useState<USER_REGISTER>({
        email: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError("")
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        try {
            const reponse = await checkEmailExist(formData.email || "")
            if (reponse.message) {
                mailRegister(formData.email || "").then(() => {
                    setSuccess("Please check your email to confirm your registration")
                }
                ).catch((err: unknown) => {
                    if ((err as AXIOS_ERROR).message) {
                        setError((err as AXIOS_ERROR).message || "Error during registration")
                    } else {
                        setError("Error during registration")
                    }
                }
                )}
            else{
                setError("Error during registration - email already exists")
            }
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {               
                setError((err as AXIOS_ERROR).message || "Error during registration")
            } else {
                setError("Error during registration")
            }
        }
    }
    
    return (
        <div><Navbar />
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                <h1 className="font-bold flex justify-center">Register</h1>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="email">Email</CustomLabelForm>
                        <CustomInput type="email" id="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder="Email" /></div>
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
