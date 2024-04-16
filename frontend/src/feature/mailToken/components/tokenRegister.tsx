import React from "react"
import { Link } from "react-router-dom"
import CustomButton from "../../../components/CustomButton"
import CustomInput from "../../../components/CustomInput"
import CustomLabelForm from "../../../components/CustomLabelForm"
function tokenInvalid() {
    return (
        <>
            <div className="flex items-center flex-col">
                <h1>Token is invalid</h1>
                <Link to="/register">
                    <p className="text-blue-500">Re-send email</p>
                </Link>
            </div>
        </>
    )
}
function tokenValid({ formData, handleChange, handleSubmit, checkPassword, fielCheck }: {
    formData: { username: string, password: string , R_PASSWORD: string}
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    checkPassword: {
        length: boolean
        maj: boolean
        min: boolean
        special: boolean
        same: boolean
    }
    fielCheck: string
}) {
    return (
        <>
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <h1 className="font-bold flex justify-center">Register</h1>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="username">Username</CustomLabelForm>
                        <CustomInput disabled={false} type="username" id="username" name="username" value={formData.username || ""} onChange={handleChange} placeholder="username" /></div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="password">Password</CustomLabelForm>
                        <CustomInput disabled={false} type="password" id="password" name="password" value={formData.password || ""} onChange={handleChange} placeholder="password" /></div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="r-password">Repeat password</CustomLabelForm>
                        <CustomInput disabled={false} type="password" id="r-password" name="R_PASSWORD" value={formData.R_PASSWORD || ""} onChange={handleChange} placeholder="Repeat password" /></div>
                    <div className="my-2">
                        <CustomButton value="Sign up" type="submit" />
                    </div>
                    <div className="my-2">
                        {aboutPassword(checkPassword)}
                        {fielCheck && <p className="text-red-500">{fielCheck}</p>}
                    </div>
                </form>
            </div>
        </>
    )
}

function aboutPassword(checkPassword: { length: boolean, maj: boolean, min: boolean, special: boolean, same: boolean }) {
    return (
        <>
            <div>
                <ul>
                    <li className={checkPassword.length ? "text-green-500" : "text-red-500"}>At least 10 characters</li>
                    <li className={checkPassword.maj ? "text-green-500" : "text-red-500"}>At least one uppercase letter</li>
                    <li className={checkPassword.min ? "text-green-500" : "text-red-500"}>At least one lowercase letter</li>
                    <li className={checkPassword.special ? "text-green-500" : "text-red-500"}>At least one special character</li>
                    <li className={checkPassword.same ? "text-green-500" : "text-red-500"}>Same password</li>
                </ul>
            </div>
        </>
    )
}
export { tokenInvalid, tokenValid }