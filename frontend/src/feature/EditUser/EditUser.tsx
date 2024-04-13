import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import CustomTextarea from "../../components/CustomTextarea.tsx"
import CustomButtonRadio from "../../components/CustomButtonRadio.tsx"
import UserProfile from "../../type/feature/user/user_profil.ts"
import {getDataProfil, updateProfile} from "./service/EditUserService.tsx"
import BUFFER_IMAGE from "../../type/feature/user/buffer_image.ts";

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

     const binaryToBase64 = async (buffer: BUFFER_IMAGE|string): Promise<string> => {
        if(typeof buffer === "string") {
            const buff: BUFFER_IMAGE = {
                data:buffer.split(',').map((byte: string) => parseInt(byte, 10)),
                type:"BUFFER_IMAGE",
            }
            const binaryString = buff.data.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
            return btoa(binaryString);
        }else{
            const binaryString = buffer.data.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
            return btoa(binaryString);
        }

    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userProfileData = await getDataProfil()
                if(userProfileData.image!==undefined) {
                    const imageConvert = 'data:image/jpeg;base64,'+await binaryToBase64(userProfileData.image);

                    setFormData(userProfileData)
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        username: sessionStorage.getItem("login") || "",
                        image: imageConvert,
                    }));
                // console.log(imageConvert)
                }
            } catch (error) {
                // console.error('Error fetching user profile:', error)
                // Gérer les erreurs
            }
        }

        fetchUserProfile()
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        try {
            await updateProfile(formData)
            setSuccess("Inscription réussie. Vous êtes maintenant inscrit.")
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Erreur lors de l'inscription")
            } else {
                setError("Erreur lors de l'inscription")
            }
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const handleVisibilityChange = (value: "public" | "private") => {
        setFormData({ ...formData, visibility: value })
    }
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>)=>{
        const file = event.target.files && event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const dataUrl = reader.result as string
                setFormData({ ...formData, image: dataUrl })
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex justify-center mt-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                <h1 className="font-bold flex justify-center">Inscription</h1>

                <div className="flex justify-center items-center mt-4 mr-8 mb-4 ml-8">
                    <div className="relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <input
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        {formData.image && typeof formData.image === "string" && (
                            <img className="w-full h-full rounded" src={formData.image} alt="" />
                        )}
                    </div>
                </div>

                <div className="flex  justify-center">
                    <div className="flex items-center me-4">
                        <CustomButtonRadio
                            type="radio"
                            value="private"
                            checked={formData.visibility === "private"}
                            onChange={() => { handleVisibilityChange("private") }}
                        />
                        <CustomButtonRadio
                            type="radio"
                            value="public"
                            checked={formData.visibility === "public"}
                            onChange={() => { handleVisibilityChange("public") }}
                        />
                    </div>
                </div>

                <div className="my-2">
                    <CustomLabelForm htmlFor="username">Nom d'utilisateur</CustomLabelForm>
                    <CustomInput
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Nom d'utilisateur"
                    />
                </div>
                <div className="my-2">
                    <CustomLabelForm htmlFor="email">Email</CustomLabelForm>
                    <CustomInput
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                </div>
                <div className="my-2">
                    <CustomLabelForm htmlFor="bio">Votre bio</CustomLabelForm>
                    <CustomTextarea
                        name="bio"
                        onChange={handleChange}
                        value={formData.bio}
                        placeholder="Votre bio"
                        rows={3}
                    />
                </div>
                <div className="my-2">
                    <div className="flex justify-end">
                        <CustomButton value="Valider" type="submit" />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </div>
            </form>
        </div>
    )
}

export default EditUser
