interface PurchaseRequest {
    id: number
    price: number
    is_approved: number
    seller: {
        username: string
    }
    nft: {
        id: number
        link: string
        image: string
    }
    buyer: {
        id: number
        username: string
        image: string
    }
}
interface RequestsPurchaseNFTResponse {
    requestsPurchaseNFT: PurchaseRequest[]
    status: boolean
    message: string
}

export default RequestsPurchaseNFTResponse
