interface NFT{
    id: number
    minted: number
    description: string
    image: string
    link: string
    place: string
    draft: boolean
    hashtags: string
}

interface ResponseNFT{
    nfts: NFT[]
}

export default ResponseNFT