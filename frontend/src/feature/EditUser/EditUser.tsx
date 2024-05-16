import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomTextarea from "../../components/CustomTextarea.tsx"
import CustomButtonRadio from "../../components/CustomButtonRadio.tsx"
import UserProfile from "../../type/feature/user/user_profil.ts"
import {getDataProfil, updateProfile} from "./service/EditUserService.ts"
import ModalChangePassword from "./ModalChangePassword.tsx"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import Navbar from "../navbar/navbar.tsx"
import Sidebar from "../navbar/sidebar.tsx"
const EditUser = () => {
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState({message: "", color: false})
    const [formData, setFormData] = useState<UserProfile>({
        id: 0,
        username:"",
        email: "",
        image: "",
        bio: "",
        visibility: "public",
        link: "",
        SEARCH_STATUS: false
    })
    const toggleModalPassword = () => {
        setShowModalPassword(!showModalPassword)
    }
    const [showModalPassword, setShowModalPassword] = useState<boolean>(false)
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfileData = await getDataProfil()
                setFormData(userProfileData)
            } catch (err: unknown) {
                if ((err as AXIOS_ERROR).message) {
                    setError("Error connecting")
                }
            }
        }
        fetchUserProfile().then(r => r).catch((e: unknown) => e)
    }, [])
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess({message: "", color: false})

        try {
            await handleProfileUpdate()
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Error updating profile ")
            }
        }
    }
    const handleProfileUpdate = async () => {
        try {
            const result = await updateProfile(formData)
            setSuccess({message:result.message, color: true})
            if (result.message !== "User updated successfully") {
                setSuccess({message: result.message, color: false})
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
            <Navbar/><Sidebar/>
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <h1 className="font-bold flex justify-center">Edit Profile</h1>
                    <div className="flex justify-center items-center mt-4 mr-8 mb-4 ml-8">
                        <div className="relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                            <input type="file" name="image" onChange={handleFileChange} className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"/>
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
                        <CustomLabelForm htmlFor="email">Link</CustomLabelForm>
                        <CustomInput type="text" id="link" name="link" value={formData.link} onChange={handleChange} placeholder="Link" disabled={false}/>
                    </div>
                    <div className="my-2">
                        <CustomLabelForm htmlFor="bio">Your bio</CustomLabelForm>
                        <CustomTextarea name="bio" onChange={handleChange} value={formData.bio} placeholder="Votre bio" rows={3}/>
                    </div>
                    <div className="my-2 flex justify-between">
                        <CustomLabelForm htmlFor="search_status">Enable search</CustomLabelForm>
                        <input type="checkbox" checked={formData.SEARCH_STATUS} onChange={()=>{setFormData({...formData,SEARCH_STATUS:!formData.SEARCH_STATUS})}} name="search_status" id="search_status" />                        
                    </div>
                    <div className="my-2">
                        <div className="flex justify-end">
                            <CustomButton value="Valider" type="submit"/>
                        </div>
                        {error && <p style={{color: "red"}}>{error}</p>}
                        {success.message!=="" && <p style={success.color ? {color:"green"} : {color: "red"}}>{success.message}</p>}
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
