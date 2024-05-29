import {useEffect, useState} from "react"
import Draft from "../../../type/feature/nft/Draft.ts"
import ResponseNFT from "../../../type/feature/nft/NFT.ts"
import {useTranslation} from "react-i18next"
import Navbar from "../../navbar/navbar.tsx"
import {getDraftsCompleted} from "./service/PostNFTService.ts"
import {Link} from "react-router-dom"
import CustomButton from "../../../components/CustomButton.tsx";


const ChooseNFTPost = () => {
    const [images, setImages] = useState<Draft[]>([])
    const {t} = useTranslation()
    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const drafts:ResponseNFT = await getDraftsCompleted()
                const imagesList = drafts.nfts.map((item) => ({
                    id: item.id,
                    image: item.image || ""
                }))
                setImages(imagesList)
            } catch (error) {
                throw new Error("Error getting drafts")
            }
        }

        fetchDrafts()
            .then(r => r)
            .catch((e: unknown) => e)
    }, [])

    return (
        <>
            <Navbar/>

            <div className="flex flex-col items-center min-h-screen">
                <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
                    {t("Choose NFT to Post (Draft must be completed)")}
                    <div className={"flex justify-center"}>
                        <Link to={"/nft/"}>
                                <CustomButton  value={t("Drafts")} type="submit"/>
                        </Link>
                    </div>
                </h2>
                <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map(image => (
                <div key={image.id} className="relative w-72 h-60 overflow-hidden rounded-md">
                    <img src={image.image} alt={`Draft ${String(image.id || "")}`}
                         className="object-cover w-full h-full"/>
                    <div className="absolute bottom-2 right-2 space-x-2 z-10">
                        <Link
                            to={"/postNFT/confirmPost/"}
                        state={{id:image.id}}>
                        <button
                            className="bg-green-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">
                            {t("Post")}
                        </button>
                    </Link>

                    </div>
                </div>
            ))}
        </div>
            </div>
            </>
    )
}

export default ChooseNFTPost