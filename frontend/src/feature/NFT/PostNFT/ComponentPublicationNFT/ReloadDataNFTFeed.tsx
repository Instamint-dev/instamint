import {getCommentsNFT} from "../service/PostNFTService.ts"
import {ifUserLikedNFT} from "../../DraftNFT/service/NFTService.ts"
import ResponseSingleNFT from "../../../../type/feature/nft/ResponseSingleNFt.ts"
import {CommentsType} from "../../../../type/feature/nft/CommentsType.ts"
import {nestComments} from "./ReloadDataNFTDetail.ts"

export const reloadDataNFTFeed = async (nftParams: ResponseSingleNFT, isAuthenticated: boolean, setInfoNft: React.Dispatch<React.SetStateAction<ResponseSingleNFT | undefined>>, setComments: React.Dispatch<React.SetStateAction<{ comments: CommentsType[] }>>) => {
    try {

        const commentsBdd = await getCommentsNFT(nftParams.nft.id)

        const nestedComments = nestComments(commentsBdd.comments)

        setComments({ comments: nestedComments })

        if (isAuthenticated) {
            const isLiked = await ifUserLikedNFT(nftParams.nft.id)
            setInfoNft({
                ...nftParams,
                username: nftParams.username,
                isLiked: isLiked.isLiked,
            })
        } else {
            setInfoNft({
                ...nftParams,
                username: nftParams.username,
                isLiked: false
            })
        }
    } catch (err) {
        console.error("Failed to reload NFT details", err)
    }
}