import {useState, ChangeEvent, FormEvent} from "react"
import ModalQrCodeProps  from "../../type/feature/doubleAuth/modal_qr_code_props"
import CustomLabelForm from "../../components/CustomLabelForm"
import CustomInput from "../../components/CustomInput"
import CustomButton from "../../components/CustomButton"
import { checkDOubleAuth } from "./service/doubleAuthService"
import AXIOS_ERROR from "../../type/request/axios_error"

const ModalQrCode = ({ toggleModal, qrCode, setSuccess}: ModalQrCodeProps) => {
    const [formData, setFormData] = useState({code: ""})
    const [error, setError] = useState("")
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {setFormData({ ...formData, [e.target.name]: e.target.value })}
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await checkDOubleAuth(formData.code, "")
            if (response.message) {
                setError("")
                setSuccess(true)
                toggleModal()
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
        <div id="modal" tabIndex={0} aria-hidden="true" className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50">
            <div className="relative w-full max-w-md p-6 mx-auto mt-12 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Check double authentification</h3>
                    <button onClick={toggleModal} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="my-2">
                        <img src={qrCode} alt="" className="w-full h-full" />
                    </div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="password">Code</CustomLabelForm>
                        <CustomInput disabled={false} id="code" type="text" name="code" value={formData.code} onChange={handleChange} placeholder="Code" />
                        <CustomButton value="Sign in" type="submit" />
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalQrCode