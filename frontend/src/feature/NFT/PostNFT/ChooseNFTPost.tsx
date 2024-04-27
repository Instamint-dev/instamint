import {useEffect, useState} from "react"
import Draft from "../../../type/feature/nft/Draft.ts"
import ResponseNFT from "../../../type/feature/nft/NFT.ts"

import Navbar from "../../navbar/navbar.tsx"
import {getDraftsCompleted} from "./service/PostNFTService.ts"
import {Link} from "react-router-dom";

const ChooseNFTPost = () => {
    const [images, setImages] = useState<Draft[]>([])


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

            <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map(image => (
                <div key={image.id} className="relative w-72 h-60 overflow-hidden rounded-md">
                    <img src={image.image} alt={`Draft ${String(image.id || "")}`}
                         className="object-cover w-full h-full"/>
                    <div className="absolute bottom-2 right-2 space-x-2">

                        <Link
                            to={'/postNFT/confirmPost/'}
                        state={{id:image?.id}}>
                        <button
                            // onClick={() => {console.log(image.id)}}
                            className="bg-green-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">
                            {/*<svg className="h-6 w-6 text-white-500" fill="none" viewBox="0 0 24 24"*/}
                            {/*     stroke="currentColor">*/}
                            {/*    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
                            {/*          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>*/}
                            {/*</svg>*/}
                            Post

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

export default ChooseNFTPost;