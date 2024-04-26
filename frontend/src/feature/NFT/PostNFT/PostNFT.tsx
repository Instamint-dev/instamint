import {useEffect, useState} from "react";
import Draft from "../../../type/feature/nft/Draft.ts";
import ResponseNFT from "../../../type/feature/nft/NFT.ts";

import Navbar from "../../navbar/navbar.tsx";
import {getDraftsCompleted} from "./service/PostNFTService.ts";

const PostNFT = () => {
    const [images, setImages] = useState<Draft[]>([])
    const [deletionCount, setDeletionCount] = useState(0)


    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const drafts:ResponseNFT = await getDraftsCompleted()
                console.log(drafts)
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
    }, [deletionCount])
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


                    </div>
                </div>
            ))}
        </div>
            </div>
            </>
    )
}

export default PostNFT