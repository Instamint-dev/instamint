import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomTextarea from "../../components/CustomTextarea.tsx"
import CustomButtonRadio from "../../components/CustomButtonRadio.tsx"
import UserProfile from "../../type/feature/user/user_profil.ts"
import {checkLoginExists, getDataProfil, updateProfile} from "./service/EditUserService.tsx"
import ModalChangePassword from "./ModalChangePassword.tsx"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import Navbar from "../navbar/navbar.tsx"
import {checkDuplicates} from "./CheckDuplicates.ts"

const EditUser = () => {
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [formData, setFormData] = useState<UserProfile>({
        username:"",
        usernameOld:"",
        email: "",
        image: "",
        bio: "",
        visibility: "public",
    })
    const toggleModalPassword = () => {
        setShowModalPassword(!showModalPassword)
    }
    const [showModalPassword, setShowModalPassword] = useState<boolean>(false)
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfileData = await getDataProfil()
                const existsResponse = await checkLoginExists(formData.username)
                if (existsResponse.exists&&formData.username!==sessionStorage.getItem("login"))
                {
                    setError("This login already exists")
                }else{
                    setFormData(userProfileData)
                    setFormData((prevFormData) => ({...prevFormData, username: sessionStorage.getItem("login") || "", usernameOld: sessionStorage.getItem("login") || "", image: userProfileData.image,}))
                }
            } catch (err: unknown) {
                if ((err as AXIOS_ERROR).message) {
                    setError("Error connecting")
                }
            }
        }
        fetchUserProfile().then(r => r).catch((e: unknown) => e)
    }, [formData.username])
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        try {
            const userProfileData = await getDataProfil()
            const { existsLogin, existsMail } = await checkDuplicates(formData, userProfileData)

            if (existsLogin) {
                setError("This login already exists")
            } else if (existsMail) {
                setError("This email already exists")
            } else {
                await updateProfileAndRedirect()
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Error updating profile ")
            }
        }
    }
    const updateProfileAndRedirect = async () => {
        await handleProfileUpdate()
        sessionStorage.setItem("login", formData.username)
        setSuccess("Profile updated !")
        setTimeout(() => {window.location.reload()}, 1000)
    }
    const handleProfileUpdate = async () => {
        try {
            const result = await updateProfile(formData)
            if (!result) {
                throw new Error("Error updating profile")
            }
        } catch (err: unknown) {
            throw new Error("Error updating profile")
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }
    const handleVisibilityChange = (value: "public" | "private") => {
        setFormData({...formData, visibility: value})
    }
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const dataUrl = reader.result as string
                setFormData({...formData, image: dataUrl})
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <Navbar/>
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <h1 className="font-bold flex justify-center">Edit Profile</h1>
                    <div className="flex justify-center items-center mt-4 mr-8 mb-4 ml-8">
                        <div className="relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                            <input type="file" name="image" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                            {formData.image && (<img className="w-full h-full rounded" src={formData.image} alt=""/>)}
                        </div>
                    </div>
                    <div className="flex  justify-center">
                        <div className="flex items-center me-4">
                            <CustomButtonRadio type="radio" value="private" checked={formData.visibility === "private"} onChange={() => {handleVisibilityChange("private")}}/>
                            <CustomButtonRadio type="radio" value="public" checked={formData.visibility === "public"}  onChange={() => {handleVisibilityChange("public")}}/>
                        </div>
                    </div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="username">Username</CustomLabelForm>
                        <CustomInput type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" disabled={false}/>
                    </div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="email">Email</CustomLabelForm>
                        <CustomInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" disabled={false}/>
                    </div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="bio">Your bio</CustomLabelForm>
                        <CustomTextarea name="bio" onChange={handleChange} value={formData.bio} placeholder="Votre bio" rows={3}/>
                    </div>
                    <div className="my-2">
                        <div className="flex justify-end">
                            <CustomButton value="Valider" type="submit"/>
                        </div>
                        {error && <p style={{color: "red"}}>{error}</p>}
                        {success && <p style={{color: "green"}}>{success}</p>}
                    </div>
                    <button onClick={toggleModalPassword} type="button">
                        <p className="text-blue-500">Change password</p>
                    </button>
                </form>
                {showModalPassword && (
                    <ModalChangePassword toggleModal={toggleModalPassword}/>
                )}
            </div>
        </>
    )
}
export default EditUser