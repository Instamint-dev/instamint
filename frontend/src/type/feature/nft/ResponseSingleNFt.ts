
interface ResponseSingleNFt{
    nft: NFT
    username: string
    mint: number
    isLiked: boolean
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