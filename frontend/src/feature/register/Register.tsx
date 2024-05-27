import { useState, ChangeEvent, FormEvent } from "react"
import { checkEmailExist, mailRegister } from "../mailToken/registerToken/service/registerTokenService.ts"
import USER_REGISTER from "../../type/feature/user/user_register.ts"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import Navbar from "../navbar/navbar.tsx"
import { Link } from "react-router-dom"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import { useTranslation } from "react-i18next"
const RegisterPage = () => {
    const { t } = useTranslation()
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
                    setSuccess(t("Please check your email to confirm your registration"))
                }
                ).catch((err: unknown) => {
                    if ((err as AXIOS_ERROR).message) {
                        setError((err as AXIOS_ERROR).message || t("Error during registration"))
                    } else {
                        setError(t("Error during registration"))
                    }
                }
                )}
            else{
                setError(t("Error during registration")+ " - " +t("email already exists"))
            }
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {               
                setError((err as AXIOS_ERROR).message || t("Error during registration"))
            } else {
                setError(t("Error during registration"))
            }
        }
    }
    
    return (
        <div><Navbar />
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                <h1 className="font-bold flex justify-center">{t("Register")}</h1>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="email">{t("Email")}</CustomLabelForm>
                        <CustomInput disabled={false} type="email" id="email" name="email" value={formData.email || ""} onChange={handleChange} placeholder={t("Email")} /></div>
                    <div className="my-2">
                        <CustomButton value={t("Sign up")} type="submit" />
                    </div>
                    <div className="my-2">
                        <p>{t("Already have an account? Log in at")}</p>
                        <div className="flex justify-end">
                        <Link to="/connection">
                            <CustomButton value={t("Sign up")} type="button" />
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
