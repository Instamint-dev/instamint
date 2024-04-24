import { generateQrCode } from "./service/doubleAuthService"
import Navbar from "../navbar/navbar"
import Sidebar from "../navbar/sidebar"
import { useState, FormEvent } from "react"
import AXIOS_ERROR from "../../type/request/axios_error"
const DoubleAuth = () => {

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleClick = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            const verify = await generateQrCode()
            console.log(verify);

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
            <Navbar />
            <Sidebar />
            <div className="flex items-center flex-col">
                <h1>Double Auth</h1>
                <button onClick={handleClick}>Generate QR code</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
            </div>
        </>
    )
}

export default DoubleAuth