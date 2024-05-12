import Navbar from "../navbar/navbar.tsx"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import CustomTextarea from "../../components/CustomTextarea.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import TeaBag from "../../type/feature/teabag/teabag_profil.ts"
import {createTeaBag, updateTeaBag,} from "./service/TeaBagService.ts"
import {useLocation} from "react-router-dom"
import {getUser} from "../Social/service/Social.ts"

const CreateTeaBag = () => {
    const location = useLocation()
    const {link } = (location.state || { link: "-1" }) as { link: string }
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState({message: "", color: false})
    const [formData, setFormData] = useState<TeaBag>({
        id: 0,
        username:"",
        image: "",
        bio: "",
        link: "",
    })

    useEffect(() => {
        const fetchData = async () => {
                if (link !== "-1") {
                    const result = await getUser(link)
                    setFormData(
                        {
                            id: 0,
                            username: result.user.userInfo.username,
                            image: result.user.userInfo.image,
                            bio: result.user.userInfo.bio,
                            link: result.user.userInfo.link
                        }
                    )
                }
        }
        fetchData().then(r => r).catch((e: unknown) => e)
    }, [])
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setSuccess({message: "", color: false})

        try {
            if (link === "-1") {
                await handleProfileUpdate()
            }else{
                const response=await updateTeaBag(formData)
                if (response) {
                    setSuccess({message: "TeaBag updated successfully", color: true})
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "Error updating profile ")
            }
        }
    }
    const handleProfileUpdate = async () => {
        try {
            const result = await createTeaBag(formData)

            if (result) {
                setSuccess({message:"TeaBag updated successfully", color: true})
            }else{
                setSuccess({message: "Error updating TeaBag profile", color: false})
            }
        } catch (err: unknown) {
            throw new Error("Error updating profile")
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
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
                           <input type="file" name="image" onChange={handleFileChange} className="absolute z-10 inset-0 w-full h-full opacity-0 cursor-pointer"/>
                           {formData.image && (<img className="w-full h-full rounded" src={formData.image} alt=""/>)}
                       </div>
                   </div>
                   <div className="my-2">
                       <CustomLabelForm htmlFor="username">Username</CustomLabelForm>
                       <CustomInput type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" disabled={false}/>
                   </div>

                   <div className="my-2">
                       <CustomLabelForm htmlFor="email">Link</CustomLabelForm>
                       <CustomInput type="text" id="link" name="link" value={formData.link} onChange={handleChange} placeholder="Link" disabled={false}/>
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
                       {success.message!=="" && <p style={success.color ? {color:"green"} : {color: "red"}}>{success.message}</p>}
                   </div>
               </form>
           </div>
       </>
    )
}

export default CreateTeaBag