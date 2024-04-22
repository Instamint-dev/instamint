interface NFT{
    id: number
    minted: number
    description: string
    image: string
    link: string
    place: string
    draft: string
    hashtags: string
}

interface ResponseNFT{
    nfts: NFT[]
}

export default ResponseNFT