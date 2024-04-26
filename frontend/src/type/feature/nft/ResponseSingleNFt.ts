
interface ResponseSingleNFt{
    nft: NFT
}

interface NFT{
    id: number
    mint: number
    description: string
    image: string
    link: string
    place: string
    draft: boolean
    hashtags: string
}

export default ResponseSingleNFt