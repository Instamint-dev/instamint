import { useState, ChangeEvent, FormEvent } from "react"
import Navbar from "../../navbar/navbar"
import CustomButton from "../../../components/CustomButton"
import AXIOS_ERROR from "../../../type/request/axios_error"
import CustomInput from "../../../components/CustomInput"
import CustomLabelForm from "../../../components/CustomLabelForm"
import { forgotPassword } from "./service/forgotPasswordService"
import { useTranslation } from "react-i18next"
const ForgotPassword = () => {
    const { t } = useTranslation()
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
                setError(t("Email not found"))
            }
            else{
                setError("")
                setSuccess(t("Check your email to reset your password"))
            }
        } catch (err: unknown) {
            const errorMessage = t("Error connecting")
            setError(errorMessage)
            if ((err as AXIOS_ERROR).message) {
                setError((err as AXIOS_ERROR).message || errorMessage)
            }
        }
    }
    
    return (
        <div><Navbar />
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <h1 className="font-bold flex justify-center">{t("Reset your password")}</h1>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="email">{t("Email")}</CustomLabelForm>
                        <CustomInput disabled={false} id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t("Email")} />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <div className="my-2">
                        <CustomButton value={t("Send")} type="submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword