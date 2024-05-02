import { CommentsType } from "./CommentsType.ts"

interface ResponseSingleNFt{
    nft: NFT
    username: string
    mint: number
    isLiked: boolean
    comments: CommentsType[]
}

interface NFT{
    id: number
    description: string
    image: string
    link: string
    place: string
    draft: boolean
    hashtags: string
    price: number
}

export default ResponseSingleNFt