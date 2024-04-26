import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { searchNFt } from "./service/NFTService"
import ResponseSingleNFt from "../../type/feature/nft/ResponseSingleNFt.ts"

function NftDetail() {
    const { imageName, link } = useParams()
    const [success, setSuccess] = useState<boolean>(true)
    const[infoNft, setInfoNft] = useState<ResponseSingleNFt>()

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const nft: ResponseSingleNFt = await searchNFt(link || "")
                setInfoNft(nft)
            } catch (err: unknown) {
                setSuccess(false)
            }
        }
        fetchUserProfile().then(r => r).catch((e: unknown) => e)
    }, [link])

    if (!success) {
        return (
            <div>
                <h2>Loading...</h2>
                <img src="https://instamintkami.blob.core.windows.net/instamint/UUq.gif" alt="Loading GIF" />
            </div>
        )
    }

    return (
        <div>
            <h2>Details du NFT{imageName}</h2>
            <p>Nom de l'image: {infoNft?.nft.image}</p>
        </div>
    )
}

export default NftDetail
