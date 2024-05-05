import {useEffect, useState} from "react"
import Draft from "../../../type/feature/nft/Draft.ts"
import ResponseNFT from "../../../type/feature/nft/NFT.ts"
import {getDraftsPost} from "./service/PostNFTService.ts"
import ListNFT from "../../../components/ListNFT.tsx"
const NFTPost = () => {
    const [images, setImages] = useState<Draft[]>([])
    const [linkNft, setLinkNft] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [copySuccess, setCopySuccess] = useState<boolean>(false)

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


  return (
   <>
    <ListNFT
        images={images}
        isModalOpen={isModalOpen}
        linkNft={linkNft}
        copySuccess={copySuccess}
        setLinkNft={setLinkNft}
        setIsModalOpen={setIsModalOpen}
        setCopySuccess={setCopySuccess}
        onProfile={false}
    />
   </>
  )
}

export default NFTPost
