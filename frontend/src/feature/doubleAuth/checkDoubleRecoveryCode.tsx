import { useAuth } from "../../providers/AuthProvider"
import CustomButton from "../../components/CustomButton"
import CustomInput from "../../components/CustomInput"
import { useState, ChangeEvent, FormEvent } from "react"
import { useTranslation } from "react-i18next"
import AXIOS_ERROR from "../../type/request/axios_error"
import Navbar from "../navbar/navbar"
const CheckDoubleRecoveryCode = () => {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({ code: "" })
    const [error, setError] = useState("")
    const { checkRecoveryCodeLogin } = useAuth()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const user = sessionStorage.getItem("username")
            const response = await checkRecoveryCodeLogin(formData.code, user || "")
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

    return (
        <>
            <Navbar />
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <h1 className="py-2 text-gray-700">{t("Check Recovery Code")}</h1>
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
                </form>
            </div>
        </>
    )
}

export default CheckDoubleRecoveryCode