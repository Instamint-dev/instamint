import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import { ChangeEvent, FormEvent, useState } from "react"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import USER_CHANGE_PASSWORD from "../../type/feature/user/user_change_password.ts"
import {updatePassword} from "./service/EditUserService.ts"
import { useTranslation } from "react-i18next"
const ModalChangePassword = ({ toggleModal }: { toggleModal: () => void }) => {
    const { t } = useTranslation()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [formData, setFormData] = useState<USER_CHANGE_PASSWORD>({
        oldPassword: "",
        newPassword: "",
        ConfirmNewPassword: "",
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))

        if (name === "newPassword" || name === "ConfirmNewPassword") {
            if (validatePassword(formData.newPassword, value)) {
                setError(t("Please make sure your password meets all the requirements."))
                setSuccess("")
            } else {
                setError("")
            }
        }
    }
    const validatePassword = (password: string, confirmPassword: string): boolean => {
        const passwordErrors = {
            length: password.length >= 10,
            maj: /[A-Z]/u.test(password),
            min: /[a-z]/u.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/u.test(password),
            same: password ===confirmPassword
        }

        return !passwordErrors.length || !passwordErrors.maj || !passwordErrors.min || !passwordErrors.special || !passwordErrors.same
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            if (validatePassword(formData.newPassword, formData.ConfirmNewPassword)) {
                setError(t("Please make sure your password meets all the requirements."))
            }else{
                await updatePassword( formData.newPassword)
                setSuccess(t("Password updated successfully"))
                const timer = setTimeout(() => {
                clearTimeout(timer)
                     toggleModal()
                }, 1000)
            }
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                setError(t("Password error"))
            }
        }
    }

    return (
        <>
            <div id="modal" tabIndex={0} aria-hidden="true" className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50">
                <div className="relative w-full max-w-md p-6 mx-auto mt-12 bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{t("Change password")}</h3>
                        <button onClick={toggleModal} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>

                        <div className="my-2">
                            <CustomLabelForm htmlFor="oldPassword">{t("Old password")}</CustomLabelForm>
                            <CustomInput
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                placeholder={t("Old password")}
                                disabled={false}
                            />
                        </div>

                        <div className="my-2">
                            <CustomLabelForm htmlFor="newPassword">{t("New password")}</CustomLabelForm>
                            <CustomInput
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder={t("New password")}
                                disabled={false}
                            />
                        </div>
                        <div className="my-2">
                            <CustomLabelForm htmlFor="ConfirmNewPassword">{t("Confirm new password")}</CustomLabelForm>
                            <CustomInput
                                type="password"
                                id="ConfirmNewPassword"
                                name="ConfirmNewPassword"
                                value={formData.ConfirmNewPassword}
                                onChange={handleChange}
                                placeholder={t("Confirm new password")}
                                disabled={false}
                            />
                        </div>
                        <div className="flex justify-end mt-6">
                            <button onClick={toggleModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none">{t("Close")}</button>
                            <button type="submit" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">{t("Save")}</button>
                        </div>
                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </div>
            </div>
        </>
    )
}

export default ModalChangePassword
