import { generateQrCode, doubleAuthEnable, disabledoubleAuth, recoveryCode } from "./service/doubleAuthService"
import Navbar from "../navbar/navbar"
import Sidebar from "../navbar/sidebar"
import { useState, FormEvent, useEffect } from "react"
import AXIOS_ERROR from "../../type/request/axios_error"
import ModalQrCode from "./modalQrCode"
import CustomInput from "../../components/CustomButton"
import { useTranslation } from "react-i18next"
import ModalRecoveryCode from "./modalRecoveryCode"
const DoubleAuth = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [qrCode, setQrCode] = useState("")
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalRecoveryCode, setShowModalRecoveryCode] = useState<boolean>(false)
    const [recoveryCodeString, setRecoveryCodeString] = useState<string[]>([""])
    const { t } = useTranslation()
    const toggleModal = () => {
        setShowModal(!showModal)
    }
    const toggleModalRecoveryCode = () => {
        setShowModalRecoveryCode(!showModalRecoveryCode)
    }
    const getRecoveryCode = async () => {
        try {
            const response = await recoveryCode()
            setShowModalRecoveryCode(true)
            setRecoveryCodeString(response)
        } catch (err: unknown) {
            const errorMessage = t("Error connecting")
            setError(errorMessage)
            if ((err as AXIOS_ERROR).message) {
                setError((err as AXIOS_ERROR).message || errorMessage)
            }
        }
    }
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await doubleAuthEnable()
                if (response.message) {
                    setSuccess(true)
                }
            } catch (err: unknown) {
                const errorMessage = t("Error connecting")
                setError(errorMessage)
                if ((err as AXIOS_ERROR).message) {
                    setError((err as AXIOS_ERROR).message || errorMessage)
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
            const errorMessage = t("Error connecting")
            setError(errorMessage)
            if ((err as AXIOS_ERROR).message) {
                setError((err as AXIOS_ERROR).message || errorMessage)
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
            <Sidebar />
            {
                success &&
                <div className="flex justify-center">
                    <div className="max-w-48">
                        <CustomInput type="button" value={t("You can find your emergency code here")} onClick={getRecoveryCode} />
                    </div>
                </div>
            }
            <div className="flex items-center flex-col">
                <h1>{t("Two-factor authentication")}</h1>
                {success ?
                    <>
                    <h2>{t("You already enable double Authentification")}</h2>
                    <CustomInput type="button" value={t("You can disabled it here")} onClick={disabledDoubleAuth}/>
                    </>
                    :
                    <>
                    <CustomInput type="button" value={t("Generate QR code")} onClick={handleClick}/>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {showModal && (<ModalQrCode toggleModal={toggleModal} qrCode={qrCode} setSuccess={setSuccess} />)}
                    </>  
                }
                {showModalRecoveryCode && (<ModalRecoveryCode toggleModal={toggleModalRecoveryCode} recoveryCode={recoveryCodeString} />)}
            </div>
        </>
    )
}

export default DoubleAuth