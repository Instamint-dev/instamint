import {useLocation} from "react-router-dom"
import {ChangeEvent, useEffect, useState} from "react"
import {getDataProfil} from "../../../EditUser/service/EditUserService.ts"
import {getDraftWithId,  updateDraft} from "../../DraftNFT/service/NFTService.ts"
import FormNFT from "../../../../type/feature/nft/FormNFT.ts"
import Navbar from "../../../navbar/navbar.tsx"
import CustomLabelForm from "../../../../components/CustomLabelForm.tsx"
import CustomInput from "../../../../components/CustomInput.tsx"
import CustomTextarea from "../../../../components/CustomTextarea.tsx"
import CustomButton from "../../../../components/CustomButton.tsx"

const ConfirmPost = () => {
    const location = useLocation()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const { id } = location.state || {}
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

    const verifyHashtags = (value: string) => {
        const hasThreeOrMoreHashtags = value ? (value.match(/#/gu)?.length ?? 0) > 5 : false

        if (hasThreeOrMoreHashtags) {
            console.log("You can't have more than 3 hashtags")
            setError("You can't have more than 3 hashtags")

            return false
        }

        setError("")

        return true
    }
    useEffect(() => {
        const fetchData = async () => {
            const userProfileData = await getDataProfil()
            if (id) {
                const draftBdd = await getDraftWithId(Number(id))

                setFormData((prevData) => ({
                    ...prevData,
                    ...draftBdd.nft,
                    place: draftBdd.nft.place || "",
                    description: draftBdd.nft.description || "",
                    hashtags: draftBdd.nft.hashtags || "",
                    image: draftBdd.nft.image || "",
                    draft: false,
                    price: draftBdd.nft.price || 0
                }))
            }

            setFormData((prevData) => ({
                ...prevData,
                username: userProfileData.username,
            }))
        }

        fetchData().then(r => r).catch((e: unknown) => e)
    }, [])

    const handleSubmit = () => {
        const containsInvalidChars = /[#@]/.test(formData.description)

        if (verifyHashtags(formData.hashtags)&&!containsInvalidChars) {
        updateDraft(formData)
            .then(() => {
                setSuccess("Draft posted successfully")
            })
            .catch(() => {
                setError("Error posting draft")
            })
         }else{
            setError("One or more fields are invalid")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target


        if(name === "description"){
            const containsInvalidChars = /[#@]/.test(value)
                if(containsInvalidChars){
                    setError("You can't use # or @ in description")
                }else{
                    setError("")
                }
        }

        if (name === "hashtags") {
            verifyHashtags(value)
        }
        setFormData({...formData, [name]: value})
    }


    return (
        <>
            <Navbar/>

            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start h-screen">
                <div key={formData.id} className="flex-none w-90 rounded-md overflow-hidden">
                <img src={formData.image} alt={`Draft ${String(formData.id || "")}`}
                     className="object-cover w-full h-full"/>
            </div>

            <div className="flex flex-col justify-start ml-4 space-y-2">
                {/*<form className="flex flex-col justify-start ml-4 space-y-2 bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>*/}
                    {/*<div className="my-2">*/}
                    {/*    <CustomLabelForm htmlFor="author">Author</CustomLabelForm>*/}
                    {/*    <CustomInput type="text" id="author" name="author" value={formData.username} onChange={handleChange} placeholder="Hashtags" disabled={true}/>*/}
                    {/*</div>*/}



                    <div className="my-2">
                        <CustomLabelForm htmlFor="hashtags">Hashtags</CustomLabelForm>
                        <CustomInput type="text" id="hashtags" name="hashtags" value={formData.hashtags} onChange={handleChange} placeholder="Hashtags" disabled={false}/>
                    </div>

                    <div className="my-2">
                        <CustomLabelForm htmlFor="place">Place</CustomLabelForm>
                        <CustomInput id="place" type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Place" disabled={false}/>
                    </div>

                    {/*<div className="my-2">*/}
                    {/*    <CustomLabelForm htmlFor="link">Link</CustomLabelForm>*/}
                    {/*    <CustomInput id="link" type="text" name="link" value={currentUrl + (formData.link || "")} onChange={handleChange} placeholder={currentUrl} disabled={false}/>*/}
                    {/*</div>*/}

                    <div className="my-2">
                        <CustomLabelForm htmlFor="description">Description</CustomLabelForm>
                        <CustomTextarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
                    </div>

                    <div className="my-2">
                        {error && <p style={{color: "red"}}>{error}</p>}
                        {success && <p style={{color: "green"}}>{success}</p>}
                    </div>

            </div>

                <div className="absolute top-16 right-0 ">
                   <CustomButton value={"Post"} type={"submit"} onClick={handleSubmit}/>
                </div>

        </div>


</>
    )
}

export default ConfirmPost