import { useState, ChangeEvent, FormEvent } from "react"
import Navbar from "../../navbar/navbar"
import CustomButton from "../../../components/CustomButton"
import AXIOS_ERROR from "../../../type/request/axios_error"
import CustomInput from "../../../components/CustomInput"
import CustomLabelForm from "../../../components/CustomLabelForm"
import { forgotPassword } from "./service/forgotPasswordService"

const ForgotPassword = () => {
    const [formData, setFormData] = useState<{ email: string }>({
        email: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const verify = await forgotPassword(formData.email)
            
            if (!verify.message) {
                setError("Email not found")
            }
            else{
                setError("")
                setSuccess("Check your email to reset your password")
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
                        <CustomLabelForm htmlFor="email">Email</CustomLabelForm>
                        <CustomInput disabled={false} id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email" />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <div className="my-2">
                        <CustomButton value="Sign in" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword