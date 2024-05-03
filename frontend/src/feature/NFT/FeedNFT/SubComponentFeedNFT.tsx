import React, {useEffect, useState} from "react"
import { getNFTsFeed} from "./service/FeedNFTService.ts"

import ResponseSingleNFt from "../../../type/feature/nft/ResponseSingleNFt.ts"
import NftDetail from "../PostNFT/NftDetail.tsx"


interface SubComponentNFTProps {
    tab: string
}

const SubComponentFeedNFT: React.FC<SubComponentNFTProps> = ({ tab }) => {
    const [nfts, setNfts] = useState<ResponseSingleNFt[]>([])
    const [action, setAction] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const nftsList: ResponseSingleNFt[] = await getNFTsFeed()
                setNfts(nftsList)
            } catch (err) {
                throw new Error("Failed to fetch NFTs")
            }
            finally {
                setLoading(false)
            }
        }

        fetchNFTs().then(r => r).catch((e: unknown) => e)
    }, [tab,action])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img
                    src="https://instamintkami.blob.core.windows.net/instamint/waiting.gif"
                    alt="Loading GIF"
                />
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {nfts.map((nft) => (
                <div key={nft.nft.id} className="mb-4">
                    <NftDetail
                        setActionParam={setAction}
                        nftParams={nft}/>
                </div>
            ))}
        </div>

    )
}

export default SubComponentFeedNFT