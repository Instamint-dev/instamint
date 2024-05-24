interface RequestExchangeNFT {
    id: number
    isApproved: boolean
    nftPropose: {
        id: number
        link: string
        image: string
    }
    nft_minter_would: {
        id: number
        link: string
        image: string
    }
    minter: {
        id: number
        username: string
        image: string
    }
}

interface RequestsExchangeNFTResponse{
    requestsExchangeNFT: RequestExchangeNFT[]
    status:boolean
    message:string
}

export default RequestsExchangeNFTResponse