import Navbar from "../navbar/navbar.tsx"
import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import CustomLabelForm from "../../components/CustomLabelForm.tsx"
import CustomInput from "../../components/CustomInput.tsx"
import CustomTextarea from "../../components/CustomTextarea.tsx"
import CustomButton from "../../components/CustomButton.tsx"
import { useNavigate, useParams} from "react-router-dom"
import {registerDraft, updateDraft} from "./service/NFTService.ts"
import {getDraftWithId} from "./service/NFTService"
import FormNFT from "../../type/feature/nft/FormNFT.ts"
const FormDraft=()=>{
    const [error, setError] = useState<string>("")
    const navigate = useNavigate()
    const [success, setSuccess] = useState<string>("")
    const currentUrl = `${window.location.origin}/nft/searchNFt/`
    const [formData, setFormData] = useState<FormNFT>({
        id: -1,
        place:"",
        image: "",
        description: "",
        draft: true,
        hashtags: "",
        link:" "
    })
    const { id } = useParams()


    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const draftBdd = await getDraftWithId(Number(id))
                setFormData((prevData) => ({
                    ...prevData,
                    username: sessionStorage.getItem("login") || "",
                    ...draftBdd.nft,
                    link: "",
                    place: draftBdd.nft.place || "",
                    description: draftBdd.nft.description || "",
                    hashtags: draftBdd.nft.hashtags || "",
                    image: draftBdd.nft.image || "",
                }))
            }
        }

        fetchData().then(r => r).catch((e: unknown) => e)
    }, [id])
    const verifyHashtags = (value: string) => {
        const hasThreeOrMoreHashtags = value ? (value.match(/#/gu)?.length ?? 0) > 3 : false
        if (hasThreeOrMoreHashtags) {
            setError("You can't have more than 3 hashtags")
        }else {
            setError("")
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target

        if (name === "hashtags") {
            verifyHashtags(value)
        }

        if (name === "link") {
            const newValue = value.substring(currentUrl.length)
            setFormData({ ...formData, [name]: newValue })
        }else{
            setFormData({...formData, [name]: value})
        }
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

        // Faire méthode pour vérifier si le lien existe déjà

        if (!id) {
            if (await registerDraft(formData)) {
                setSuccess("NFT registered")
                setTimeout(() => {
                    navigate("/nft", {replace: true})
                }, 1000)
            } else {
                setError("Error registering NFT")
            }

            setSuccess("")
        }else {
            if (await updateDraft(formData)) {
                setSuccess("NFT registered")
                setTimeout(() => {
                    navigate("/nft", {replace: true})
                }, 1000)
            } else {
                setError("Error registering NFT")
            }

            setSuccess("")
        }
    }

    return (
        <>
            <Navbar/>
            <div className="flex justify-center mt-8">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
                    <div className="flex justify-center items-center mt-4 mr-8 mb-4 ml-8">
                        <div className="relative w-40 h-40 bg-gray-100 rounded-full dark:bg-gray-600">
                            <input type="file" name="image" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
                            {formData.image && <img className="w-full h-full rounded" src={formData.image} alt=""/>}
                        </div>
                    </div>

                    {/*<div className="my-2">*/}
                    {/*    <CustomLabelForm htmlFor="username">Autor</CustomLabelForm>*/}
                    {/*    <CustomInput type="text" id="username" name="username" value={} onChange={handleChange} placeholder="" disabled={true}/>*/}
                    {/*</div>*/}



                    <div className="my-2">
                        <CustomLabelForm htmlFor="hashtags">Hashtags</CustomLabelForm>
                        <CustomInput type="text" id="hashtags" name="hashtags" value={formData.hashtags} onChange={handleChange} placeholder="Hashtags" disabled={false}/>
                    </div>

                    <div className="my-2">
                        <CustomLabelForm htmlFor="place">Place</CustomLabelForm>
                        <CustomInput id="place" type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Place" disabled={false}/>
                    </div>

                    <div className="my-2">
                        <CustomLabelForm htmlFor="link">Link</CustomLabelForm>
                        <CustomInput id="link" type="text" name="link"  value={currentUrl+(formData.link || "")}
                                     onChange={handleChange} placeholder={currentUrl} disabled={false}/>
                    </div>

                    <div className="my-2">
                        <CustomLabelForm htmlFor="description">Description</CustomLabelForm>
                        <CustomTextarea  name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
                    </div>

                    <div className="my-2">
                        <div className="flex justify-end">
                            <CustomButton value="Valider" type="submit"/>
                        </div>
                        {error && <p style={{color: "red"}}>{error}</p>}
                        {success && <p style={{color: "green"}}>{success}</p>}
                    </div>


                </form>
            </div>

        </>
    )
}

export default FormDraft


