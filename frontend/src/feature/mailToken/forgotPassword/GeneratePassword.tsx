import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { checkTokenValid } from "./service/generatePasswordService"
import Navbar from "../../navbar/navbar"
import CustomInput from "../../../components/CustomInput"
import CustomLabelForm from "../../../components/CustomLabelForm"
import CustomButton from "../../../components/CustomButton"

const GeneratePassword = () => {
    const token = useParams<{ id: string }>().id
    const [isValidToken, setIsValidToken] = useState(false)
    useEffect(() => {
        if (token) {
            const CHECK_TOKEN = checkTokenValid(token)
            CHECK_TOKEN.then((response) => {
                if (response.status) {
                    setIsValidToken(true)
                } else {
                    setIsValidToken(false)
                }
            })
        }
    }, [token])
    const [formData, setFormData] = useState({
        password: "",
        r_password: ""
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData.r_password && formData.password) {
            setSuccess("Success")
        } else {
            setError("Please fill in all fields")
        }
    }

    return (
        <div><Navbar />
            {isValidToken ? tokenValid({ formData, handleChange, handleSubmit, error, success }) : tokenInvalid()}
        </div>
    )
}
function tokenInvalid() {
    return (
        <>
            <div className="flex items-center flex-col">
                <h1>Token is invalid</h1>
                <Link to="/forgot-password">
                    <a className="text-blue-500">Re-send email</a>
                </Link>
            </div>
        </>
    )
}
function tokenValid({ formData, handleChange, handleSubmit, error, success }: {
    formData: { r_password: string; password: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    error: string;
    success: string;
}) {
    return (
        <>
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <h1 className="font-bold flex justify-center">New Password</h1>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="password">Password</CustomLabelForm>
                        <CustomInput type="password" id="password" name="password" value={formData.password || ""} onChange={handleChange} placeholder="password" /></div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="r-password">Repet password</CustomLabelForm>
                        <CustomInput type="password" id="r-password" name="r-password" value={formData.r_password || ""} onChange={handleChange} placeholder="r-password" /></div>
                    <div className="my-2">
                        <CustomButton value="Sign up" type="submit" />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </form>
            </div>
        </>
    )
}

function checkPassword() {
    //vérifier si mdp identique + mot de pass fort
}
export default GeneratePassword
