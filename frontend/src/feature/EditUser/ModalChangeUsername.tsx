import { ChangeEvent, FormEvent, useState } from "react"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import {updatePassword} from "./service/EditUserService.tsx"
import UserChangePassword from "../../type/feature/user/user_change_password.ts"


const ModalChangePassword = ({ toggleModal }: { toggleModal: () => void }) => {
    const login = sessionStorage.getItem("login")
    const username: string = login !== null ? login : ""
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [formData, setFormData] = useState<UserChangePassword>({
        username,
        oldPassword: "",
        newPassword: "",
        ConfirmNewPassword: ""
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            if (formData.newPassword !== formData.ConfirmNewPassword) {
                setError("Passwords do not match")
            }

            await updatePassword(username, formData.newPassword)
            setSuccess("Password updated successfully")
            toggleModal()
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                setError((err as AXIOS_ERROR).message || "Error connecting")
            } else {
                setError("Error connecting ")
            }
        }
    }

    return (
        <>
            <div id="modal" tabIndex={0} aria-hidden="true" className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50">
                <div className="relative w-full max-w-md p-6 mx-auto mt-12 bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                        <button onClick={toggleModal} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                        <div className="my-2">
                            <CustomLabelForm htmlFor="old_password">Old Password</CustomLabelForm>
                            <CustomInput
                                type="password"
                                id="old_password"
                                name="old_password"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                placeholder="Old Password"
                                disabled={false}
                            />
                        </div>
                        <div className="my-2">
                            <CustomLabelForm htmlFor="newPassword">New Password</CustomLabelForm>
                            <CustomInput
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="New Password"
                                disabled={false}
                            />
                        </div>
                        <div className="my-2">
                            <CustomLabelForm htmlFor="ConfirmNewPassword">Confirm New Password</CustomLabelForm>
                            <CustomInput
                                type="password"
                                id="ConfirmNewPassword"
                                name="ConfirmNewPassword"
                                value={formData.ConfirmNewPassword}
                                onChange={handleChange}
                                placeholder="Confirm New Password"
                                disabled={false}
                            />
                        </div>
                        <div className="flex justify-end mt-6">
                            <button onClick={toggleModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none">Close</button>
                            <button type="submit" className="ml-3 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none">Save</button>
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
