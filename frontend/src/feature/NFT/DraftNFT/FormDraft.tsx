import Navbar from "../../navbar/navbar.tsx"
import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import CustomLabelForm from "../../../components/CustomLabelForm.tsx"
import CustomInput from "../../../components/CustomInput.tsx"
import CustomTextarea from "../../../components/CustomTextarea.tsx"
import CustomButton from "../../../components/CustomButton.tsx"
import {useLocation, useNavigate} from "react-router-dom"
import {registerDraft, updateDraft,getDraftWithId} from "./service/NFTService.ts"
import FormNFT from "../../../type/feature/nft/FormNFT.ts"
import Sidebar from "../../navbar/sidebar.tsx"
import {getDataProfil} from "../../EditUser/service/EditUserService.ts"
import LocationState from "../../../type/feature/nft/location_state.ts"
import { useTranslation } from "react-i18next"
const FormDraft=()=> {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const verifyInfo = (value: string) => Boolean(value)
    const [formData, setFormData] = useState<FormNFT>({
        id: -1,
        place:"",
        image: "",
        description: "",
        draft: true,
        hashtags: "",
        link:"",
        username: "",
        price: 0
    })
    const [allFields, setAllFields] = useState<boolean>(false)
    const location = useLocation()
    const { id } = (location.state || { id: -1 }) as LocationState

    useEffect(() => {
        const fetchData = async () => {
            const userProfileData = await getDataProfil()
            if (id!==-1) {
                const draftBdd = await getDraftWithId(Number(id))
                setFormData((prevData) => ({
                    ...prevData,
                    ...draftBdd.nft,
                    place: draftBdd.nft.place || "", description: draftBdd.nft.description || "", hashtags: draftBdd.nft.hashtags || "", image: draftBdd.nft.image || "", price: draftBdd.nft.price || 0,username: userProfileData.username,
                }))
            }
            else{
                setFormData((prevData) => ({
                    ...prevData,
                    username: userProfileData.username,
                }))
            }
        }

        fetchData().then(r => r).catch((e: unknown) => e)
    }, [id])

    const verifyHashtags = (value: string) => {
        const hasThreeOrMoreHashtags = value ? (value.match(/#/gu)?.length ?? 0) > 5 : false

        if (hasThreeOrMoreHashtags) {
            setError(t("You can't have more than 5 hashtags"))

            return false
        }

        setError("")

        return true
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setError("")

        if (formData.hashtags!==""&&formData.price!==0&&formData.place!==""&&formData.description!==""&&formData.image!=="") {
                setAllFields(true)
        }else{
            setAllFields(false)
        }


         if (name === "hashtags") {
             verifyHashtags(value)
         }else if (name === "price") {
             if (isNaN(Number(value))) {
                 setError("Price must be a number")
             }
         }

        setFormData({...formData, [name]: value,draft:true})
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
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (verifyHashtags(formData.hashtags) && verifyInfo(formData.image)&&!isNaN(Number(formData.price))) {
            if (id===-1) {
                if (await registerDraft(formData)) {
                    setSuccess(t("NFTPost registered"))
                    setTimeout(() => {
                        navigate("/nft", {replace: true})
                    }, 1000)
                } else {
                    setError(t("Error registering NFTPost"))
                }

                setSuccess("")
            } else {
                if (await updateDraft(formData,0)) {
                    setSuccess(t("NFTPost registered"))
                    setTimeout(() => {
                        navigate("/nft", {replace: true})
                    }, 1000)
                } else {
                    setError(t("Error registering NFTPost"))
                }

                setSuccess("")
            }
        }
        else{
            setError(t("Please fill all the fields"))
        }
    }
    const handlePostClick = () => {
        setFormData(prevFormData => ({
            ...prevFormData,
            draft: false
        }))
    }

    return (
            <>
                <Navbar/><Sidebar/>
                <div className="flex justify-center mt-8">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                        <div className="flex justify-center items-center mt-4 mr-8 mb-4 ml-8">
                            <div className="relative w-40 h-40 bg-gray-100 rounded-full dark:bg-gray-600">
                                <input type="file" name="image" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>{formData.image && <img className="w-full h-full rounded" src={formData.image} alt=""/>}
                            </div>
                        </div>
                        <div className="my-2">
                            <CustomLabelForm htmlFor="author">{t("Author")}</CustomLabelForm>
                            <CustomInput type="text" id="author" name="author" value={formData.username} onChange={handleChange} placeholder={t("Author")} disabled={true}/>
                        </div>
                        <div className="my-2">
                            <CustomLabelForm htmlFor="hashtags">Hashtags</CustomLabelForm>
                            <CustomInput type="text" id="hashtags" name="hashtags" value={formData.hashtags} onChange={handleChange} placeholder="Hashtags" disabled={false}/>
                        </div>
                        <div className="my-2">
                            <CustomLabelForm htmlFor="place">{t("Place")}</CustomLabelForm>
                            <CustomInput id="place" type="text" name="place" value={formData.place} onChange={handleChange} placeholder={t("Place")} disabled={false}/>
                        </div>
                        <div className="my-2">
                            <CustomLabelForm htmlFor="price">{t("Price")}</CustomLabelForm>
                            <CustomInput id="price" type="text" name="price" value={formData.price.toString()} onChange={handleChange} placeholder={t("Price")} disabled={false}/>
                        </div>
                        <div className="my-2">
                            <CustomLabelForm htmlFor="description">{t("Description")}</CustomLabelForm>
                            <CustomTextarea name="description" value={formData.description} onChange={handleChange} placeholder={t("Description")}/>
                        </div>
                        <div className="my-2">
                            <div className="flex justify-end mx-1">
                                {allFields && <CustomButton value="Post" type="submit" onClick={handlePostClick} />}
                                <CustomButton value={t("Validate")} type="submit"/>
                            <div className="flex justify-end">
                                <CustomButton value={t("Confirm")} type="submit"/>
                            </div>
                            {error && <p style={{color: "red"}}>{error}</p>}
                            {success && <p style={{color: "green"}}>{success}</p>}
                        </div>
                    </div>
                    </form>
                </div>
            </>
        )
}
export default FormDraft