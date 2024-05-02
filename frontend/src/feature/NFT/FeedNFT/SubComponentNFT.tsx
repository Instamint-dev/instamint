import {useAuth} from "../../../providers/AuthProvider.tsx"
import React, {useEffect, useState} from "react"
import { getNFTsFeed} from "./service/FeedNFTService.ts"

import ResponseSingleNFt from "../../../type/feature/nft/ResponseSingleNFt.ts"
import NftDetail from "../PostNFT/NftDetail.tsx"


interface SubComponentNFTProps {
    tab: string
}

const SubComponentNFT: React.FC<SubComponentNFTProps> = ({ tab }) => {
    const [nfts, setNfts] = useState<ResponseSingleNFt[]>([])
    const { isAuthenticated } = useAuth()
    const [action, setAction] = useState<number>(0)

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const nftsList: ResponseSingleNFt[] = await getNFTsFeed(tab)
                setNfts(nftsList)
            } catch (err) {
                console.error("Failed to fetch NFTs", err)
            }
        }

        fetchNFTs()
    }, [tab,action])
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

export default SubComponentNFT