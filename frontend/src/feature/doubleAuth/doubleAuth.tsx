import { generateQrCode, doubleAuthEnable, disabledoubleAuth } from "./service/doubleAuthService"
import Navbar from "../navbar/navbar"
import Sidebar from "../navbar/sidebar"
import { useState, FormEvent, useEffect } from "react"
import AXIOS_ERROR from "../../type/request/axios_error"
import ModalQrCode from "./modalQrCode"
import CustomInput from "../../components/CustomButton"
const DoubleAuth = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [qrCode, setQrCode] = useState("")
    const [showModal, setShowModal] = useState<boolean>(false)
    const toggleModal = () => {
        setShowModal(!showModal)
    }
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await doubleAuthEnable()
                if (response.message) {
                    setSuccess(true)
                }
            } catch (err: unknown) {
                if ((err as AXIOS_ERROR).message) {
                    setError("Error connecting")
                }
            }
        }
        fetchUserProfile().then(r => r).catch((e: unknown) => e)
    })
    const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const qr = await generateQrCode()
            setShowModal(true)
            setQrCode(qr.code.svg)
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                setError((err as AXIOS_ERROR).message || "Error connecting")
            } else {
                setError("Error connecting ")
            }
        }
    }
    const disabledDoubleAuth = async () => {
        try {
            const response = await disabledoubleAuth()
            if (response.message) {
                setSuccess(false)
            }
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                setError("Error connecting")
            }
        }
    }

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="flex items-center flex-col">
                <h1>Two-factor authentication</h1>
                {success ?
                    <>
                    <h2>You already enable double Authentification</h2>
                    <CustomInput type="button" value="You can disabled it here" onClick={disabledDoubleAuth}/>
                    </>
                    :
                    <>
                    <CustomInput type="button" value="Generate QR code" onClick={handleClick}/>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {showModal && (<ModalQrCode toggleModal={toggleModal} qrCode={qrCode} setSuccess={setSuccess} />)}
                    </>  
                }
            </div>
        </>
    )
}

export default DoubleAuth