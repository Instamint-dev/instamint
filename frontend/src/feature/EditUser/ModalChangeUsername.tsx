import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import {ChangeEvent, FormEvent, useState} from "react"
import UserChangeUsername from "../../type/feature/user/user_change_username.ts"
import {checkLoginExists, updateUsername} from "./service/EditUserService.ts"
import {AxiosError} from "axios"

const ModalChangeUsername = ({ toggleModal }: { toggleModal: () => void }) =>{
    const username: string = ""
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [formData, setFormData] = useState<UserChangeUsername>({
        oldUsername: username,
        newUsername: ""
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        try {
            const existsResponse = await checkLoginExists(formData.newUsername)
            if (existsResponse.exists) {
                setError("This login already exists")
            } else {
                await updateUsername(formData.oldUsername, formData.newUsername)
                setSuccess("Username update .")
                const timer = setTimeout(() => {
                    clearTimeout(timer)
                    toggleModal()
                }, 1000)
            }
        } catch (err: unknown) {
            if ((err as AxiosError).message) {
                setError((err as AxiosError).message || "Erreur during connection")
            } else {
                setError("Erreur during connection.")
            }
        }
    }

    return(
        <>
            <div id="modal" tabIndex={0} aria-hidden="true" className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50">
                <div className="relative w-full max-w-md p-6 mx-auto mt-12 bg-white rounded-lg shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Modal Title</h3>
                        <button onClick={toggleModal} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>

                        <div className="my-2">
                            <CustomLabelForm htmlFor="oldUsername">Old username </CustomLabelForm>
                            <CustomInput
                                type="text"
                                id="oldUsername"
                                name="oldUsername"
                                value={username}
                                onChange={handleChange}
                                placeholder={username}
                                disabled={false}
                            />

                        </div>

                        <div className="my-2">
                            <CustomLabelForm htmlFor="newUsername">Old username </CustomLabelForm>
                            <CustomInput
                                type="text"
                                id="newUsername"
                                name="newUsername"
                                value={formData.newUsername}
                                onChange={handleChange}
                                placeholder={"new username"}
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

export default ModalChangeUsername