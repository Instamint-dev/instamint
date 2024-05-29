import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { checkTokenValid, savePassword } from "./service/generatePasswordService"
import Navbar from "../../navbar/navbar"
import { TokenInvalid, TokenValid } from "../components/token"
import AXIOS_ERROR from "../../../type/request/axios_error"
import validatePassword from "./ValidatePassword"
import { useTranslation } from "react-i18next"

const GeneratePassword = () => {
    const { id: token } = useParams<{ id: string }>()
    const [isValidToken, setIsValidToken] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const { t } = useTranslation()

    useEffect(() => {
        if (token) {
            const CHECK_TOKEN = checkTokenValid(token)
            CHECK_TOKEN.then((response) => {
                if (response.status) {
                    setIsValidToken(true)
                } else {
                    setIsValidToken(false)
                }
            }).catch((err: unknown) => {
                const errorMessage = t("Error connecting")
                setError(errorMessage)
                if ((err as AXIOS_ERROR).message) {
                    setError((err as AXIOS_ERROR).message || errorMessage)
                }

                setIsValidToken(false)
            })
        }
    }, [token, t])

    const [formData, setFormData] = useState({
        password: "",
        R_PASSWORD: ""
    })
    const [checkPassword, setCheckPassword] = useState({
        length: false,
        maj: false,
        min: false,
        special: false,
        same: false
    })
    const [fielCheck, setFieldCheck] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
        const newFormData = {
            ...formData,
            [name]: value
        }
        const passwordErrors = {
            length: newFormData.password.length >= 10 || newFormData.R_PASSWORD.length >= 10,
            maj: /[A-Z]/u.test(newFormData.password) || /[A-Z]/u.test(newFormData.R_PASSWORD),
            min: /[a-z]/u.test(newFormData.password) || /[a-z]/u.test(newFormData.R_PASSWORD),
            special: /[!@#$%^&*(),.?":{}|<>]/u.test(newFormData.password) || /[!@#$%^&*(),.?":{}|<>]/u.test(newFormData.R_PASSWORD),
            same: newFormData.password === newFormData.R_PASSWORD
        }

        setCheckPassword(passwordErrors)
    }
    const handleSavePasswordError = (err: unknown) => {
        const errorMessage = t("Error connecting")
        setError(errorMessage)
        if ((err as AXIOS_ERROR).message) {
            setError((err as AXIOS_ERROR).message || errorMessage)
        }
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFieldCheck("")
        const passwordErrors = validatePassword(formData)
        setCheckPassword(passwordErrors)

        if (passwordErrors.length && passwordErrors.maj && passwordErrors.min && passwordErrors.special && passwordErrors.same) {
            savePassword({ token: token || "", password: formData.password })
                .then(() => {
                    setSuccess(t("Password changed successfully"))
                })
                .catch(handleSavePasswordError)
        }
    }

    return (
        <div>
            <Navbar />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <div className="flex justify-center"><p style={{ color: "green" }}>{success}</p></div>}
            {isValidToken ? (
                <TokenValid
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    checkPassword={checkPassword}
                    fielCheck={fielCheck}
                />
            ) : (
                <TokenInvalid />
            )}
        </div>
    )
}

export default GeneratePassword
