import {useState, ChangeEvent, FormEvent} from "react"
import AXIOS_ERROR from "../../type/request/axios_error"
import { useAuth } from "../../providers/AuthProvider"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import Navbar from "../navbar/navbar"
const CheckDoubleAuthLogin = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const {checkDoubleAuth} = useAuth()
    const [formData, setFormData] = useState({code: ""})
    const [error, setError] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {setFormData({ ...formData, [e.target.name]: e.target.value })}
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const user = sessionStorage.getItem("username")
            const response = await checkDoubleAuth(formData.code, user || "")
            if (response.message) {
                setError("")
                location.href = "/"
            }
        } catch (err: unknown) {
            const errorMessage = t("Error connecting")
            setError(errorMessage)
            if ((err as AXIOS_ERROR).message) {
                setError((err as AXIOS_ERROR).message || errorMessage)
            }
        }
    }
    const navigateToRecoveryCode = () => {
        navigate("/recovery-code")
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <h1 className="py-2 text-gray-700">{t("Check Double Authentification")}</h1>
                        <CustomInput
                            id="code"
                            name="code"
                            disabled={false}
                            type="text"
                            placeholder={t("Enter your code")}
                            onChange={handleChange}
                            value={formData.code}
                        />
                    <div>
                        <CustomButton type="submit" value={t("Send")}/>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <CustomButton type="button" value={t("Use recovery code")} onClick={navigateToRecoveryCode}/>
                </form>
            </div>
        </>
    )
}

export default CheckDoubleAuthLogin