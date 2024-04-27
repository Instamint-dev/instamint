import {useEffect, useState} from "react";
import Draft from "../../../type/feature/nft/Draft.ts";
import ResponseNFT from "../../../type/feature/nft/NFT.ts";
import {getDraftsPost} from "./service/PostNFTService.ts";

const NFTPost = () => {
    const [images, setImages] = useState<Draft[]>([])

    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const drafts:ResponseNFT = await getDraftsPost()
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

    console.log(images)

  return (
   <>
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

export default NFTPost
