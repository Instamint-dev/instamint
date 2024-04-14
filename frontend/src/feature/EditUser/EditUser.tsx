import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomTextarea from "../../components/CustomTextarea.tsx"
import CustomButtonRadio from "../../components/CustomButtonRadio.tsx"
import UserProfile from "../../type/feature/user/user_profil.ts"
import {getDataProfil, updateProfile} from "./service/EditUserService.tsx"
import {binaryToBase64} from "./BinaryToBase64.ts"
import ModalChangeUsername from "./ModalChangeUsername.tsx"
import ModalChangePassword from "./ModalChangePassword.tsx"
import AXIOS_ERROR from "../../type/request/axios_error.ts"

const EditUser = () => {
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [formData, setFormData] = useState<UserProfile>({
        username: "",
        email: "",
        image: "",
        bio: "",
        visibility: "public",
    })
    const toggleModalUsername = () => {
        setShowModalUsername(!showModalUsername)
    }
    const toggleModalPassword = () => {
        setShowModalPassword(!showModalPassword)
    }
    const [showModalUsername, setShowModalUsername] = useState<boolean>(false)
    const [showModalPassword, setShowModalPassword] = useState<boolean>(false)
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfileData = await getDataProfil()
                if (userProfileData.image) {
                    const imageConvert = `data:image/jpeg;base64,${(binaryToBase64(userProfileData.image))}`
                    setFormData(userProfileData)
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        username: sessionStorage.getItem("login") || "",
                        image: imageConvert,
                    }))
                }
            } catch (err: unknown) {
                if ((err as AXIOS_ERROR).message) {
                    setError((err as AXIOS_ERROR).message || "Error connecting")
                } else {
                    setError("Error connecting ")
                }
            }
        }
        fetchUserProfile().then(r => r).catch((e: unknown) => e)
    }, [])
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        try {
            await updateProfile(formData)
            setSuccess("Profile updated !")
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Error updating profile ")
            }
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
        <div className="flex justify-center mt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                <h1 className="font-bold flex justify-center">Edit Profile</h1>
                <div className="flex justify-center items-center mt-4 mr-8 mb-4 ml-8">
                    <div className="relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <input
                            type="file" name="image" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {formData.image && typeof formData.image === "string" && (
                            <img className="w-full h-full rounded" src={formData.image} alt=""/>
                        )}
                    </div>
                </div>
                <div className="flex  justify-center">
                    <div className="flex items-center me-4">
                        <CustomButtonRadio type="radio" value="private" checked={formData.visibility === "private"} onChange={() => {handleVisibilityChange("private")}}
                        />
                        <CustomButtonRadio type="radio" value="public" checked={formData.visibility === "public"} onChange={() => {handleVisibilityChange("public")}}
                        />
                    </div>
                </div>
                <div className="my-2">
                    <CustomLabelForm htmlFor="username">Username</CustomLabelForm>
                    <CustomInput type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" disabled={true}
                    />
                    <button onClick={toggleModalUsername} type="button">
                        <p className="text-blue-500">Change username</p>
                    </button>
                </div>
                <div className="my-2">
                    <CustomLabelForm htmlFor="email">Email</CustomLabelForm>
                    <CustomInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" disabled={false}
                    />
                </div>
                <div className="my-2">
                    <CustomLabelForm htmlFor="bio">Your bio</CustomLabelForm>
                    <CustomTextarea name="bio" onChange={handleChange} value={formData.bio} placeholder="Votre bio" rows={3}
                    />
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
            {showModalUsername && (
                <ModalChangeUsername toggleModal={toggleModalUsername}/>
            )}
            {showModalPassword && (
                <ModalChangePassword toggleModal={toggleModalPassword}/>
            )}
        </div>
    )
}
export default EditUser
