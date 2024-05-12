import {useLocation, useNavigate} from "react-router-dom"
import {ChangeEvent, useEffect, useState} from "react"
import {getDataProfil} from "../../EditUser/service/EditUserService.ts"
import {getDraftWithId,  updateDraft} from "../DraftNFT/service/NFTService.ts"
import FormNFT from "../../../type/feature/nft/FormNFT.ts"
import Navbar from "../../navbar/navbar.tsx"
import CustomLabelForm from "../../../components/CustomLabelForm.tsx"
import CustomInput from "../../../components/CustomInput.tsx"
import CustomTextarea from "../../../components/CustomTextarea.tsx"
import CustomButton from "../../../components/CustomButton.tsx"
import LocationState from "../../../type/feature/nft/location_state.ts"
import {compareImages} from "../FeedNFT/service/FeedNFTService.ts"
import {getMyTeaBag} from "../../TeaBag/service/TeaBagService.ts"
import TeaBagType from "../../../type/feature/teabag/teabag_profil.ts"


const ConfirmPost = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const { id } = (location.state || { id: -1 }) as LocationState
    const [teaBags, setTeaBags] = useState<TeaBagType[]>([])
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
    const [showPopup, setShowPopup] = useState(false)
    const verifyHashtags = (value: string) => {
        const hasThreeOrMoreHashtags = value ? (value.match(/#/gu)?.length ?? 0) > 5 : false

        if (hasThreeOrMoreHashtags) {
            setError("You can't have more than 5 hashtags")

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
                const result = await getMyTeaBag()
                setTeaBags(result)

                setFormData((prevData) => ({
                    ...prevData,
                    ...draftBdd.nft,
                    id: draftBdd.nft.id || -1,
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
    }, [id])

    const handleSubmit = async () => {
        const containsInvalidChars = /[#@]/u.test(formData.description)


        if (verifyHashtags(formData.hashtags) && !containsInvalidChars) {
            if (await compareImages(formData.image)) {
                if (teaBags.length === 0) {
                    updateDraft(formData,0)
                        .then(() => {
                            setTimeout(() => {
                                setSuccess("Draft posted successfully")
                                navigate("/nft", {replace: true})
                            }, 1000)
                        })
                        .catch(() => {
                            setError("Error posting draft")
                        })
                }else {
                    setShowPopup(true)
                }
            } else {
                setError("NFT already exists in the database")
            }
        } else {
            setError("One or more fields are invalid")
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target

        if(name === "description") {
            const containsInvalidChars = /[#@]/u.test(value)
                if(containsInvalidChars) {
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
    const handlePostOn = (idPost: number) => {
        updateDraft(formData,idPost)
            .then(() => {
                setTimeout(() => {
                    setSuccess("Draft posted successfully")
                    navigate("/nft", {replace: true})
                }, 1000)
            })
            .catch(() => {
                setError("Error posting draft")
            })

        setShowPopup(false)
    }


    return (
        <>
            <Navbar/>

            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-start h-screen">
                <div key={formData.id} className="flex-none sm:w-1/2 md:w-1/3 rounded-md overflow-hidden">
                    <img src={formData.image} alt={`Draft ${String(formData.id || "")}`}
                         className="object-cover w-full h-full"/>
                </div>

                <div className="flex flex-col justify-start ml-0 sm:ml-4 space-y-2">
                    <div className="my-2">
                        <CustomLabelForm htmlFor="hashtags">Hashtags</CustomLabelForm>
                        <CustomInput type="text" id="hashtags" name="hashtags" value={formData.hashtags} onChange={handleChange} placeholder="Hashtags" disabled={false}/>
                    </div>

                    <div className="my-2">
                        <CustomLabelForm htmlFor="place">Place</CustomLabelForm>
                        <CustomInput id="place" type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Place" disabled={false}/>
                    </div>

                    <div className="my-2">
                        <CustomLabelForm htmlFor="description">Description</CustomLabelForm>
                        <CustomTextarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
                    </div>

                    <div className="my-2">
                        {error && <p style={{color: "red"}}>{error}</p>}
                        {success && <p style={{color: "green"}}>{success}</p>}
                    </div>
                </div>
                <div className="absolute top-16 right-0">
                    <CustomButton value={"Post"} type={"submit"} onClick={handleSubmit}/>
                </div>
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-14 rounded-md shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Where do you want to post?</h2>
                            {teaBags.map(teaBag => (
                                <div key={teaBag.id} className="flex flex-col space-y-4">
                                    <button onClick={() =>  {handlePostOn(teaBag.id)}} className="px-4 py-2 bg-blue-500 text-white rounded-md">Post on {teaBag.username}</button>
                                </div>
                            ))}
                            <div className="flex flex-col space-y-4 my-2">
                                <button onClick={() => { handlePostOn(0)}} className="px-4 py-2 bg-blue-500 text-white rounded-md">Post on My Account</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ConfirmPost