import { Link } from "react-router-dom"
import UserProfile from "../../type/feature/user/user_profil.ts"
import { changeStatusRequestPurchase} from "./service/MarcheService.ts"
import RequestsPurchaseNFT from "../../type/feature/marche/RequestsPurchaseNFT.ts"

interface requestsReceivedProps {
    requestPurchaseNFT: RequestsPurchaseNFT | undefined
    user: UserProfile | undefined
    setAction?: (action: (prev: number) => number) => void
}

const RequestPurchaseComponent = ({ requestPurchaseNFT, user, setAction }: requestsReceivedProps) => {
    const handleApprove = async (id: number) => {
        if (setAction) {
            setAction((prev) => prev + 1)
        }

        await changeStatusRequestPurchase(id, 1)
    }
    const handleReject = async (id: number) => {
        if (setAction) {
            setAction((prev) => prev + 1)
        }

       await changeStatusRequestPurchase(id, 0)
    }
    const isBuyer = (username: string | undefined, buyerUsername: string | undefined): boolean => (
         username === buyerUsername
    )
    const getApprovalStatus = (isApproved: number | null,response:boolean) => {
            if (isApproved === 1) {
                return {text: "Purchase accepted", className: "text-green-500"}
            } else if (isApproved === 0) {
                return {text: "Purchase rejected", className: "text-red-500"}
            } else if (isApproved === 2 && response) {
                return {text: "Waiting for approval ", className: "text-black"}
            }

            return {text: "", className: ""}
    }

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 justify-items-center items-center my-2">
                <h1>Purchase Requests</h1>
                {requestPurchaseNFT?.requestsPurchaseNFT.map((request) => {
                    const { text: approvalText, className: approvalClass } = getApprovalStatus(request.is_approved,request.buyer.username===user?.username)

                    return (
                        <div key={request.id.toString()} className="bg-gray-100 p-2 rounded-lg shadow-md w-2/5 my-1">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-semibold">
                                    {isBuyer(user?.username, request.buyer.username) ? request.seller.username : request.buyer.username}
                                </p>
                                <Link to={`/nft/searchNFT/${request.nft.link}`}>
                                    <img src={request.nft.image} alt={request.nft.link} className="w-24 h-24 rounded-lg mt-2" />
                                </Link>
                            </div>
                            <div className="mb-2">
                                <p className="text-lg">Price: ${request.price}</p>
                            </div>
                            <div className="flex justify-center">
                                {user?.username===request.seller.username && request.is_approved === 2 && (
                                    <>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                            onClick={() => handleReject(request.id)}
                                        >
                                            Reject
                                        </button>
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md mx-4"
                                            onClick={() => handleApprove(request.id)}
                                        >
                                            Accept
                                        </button>
                                    </>
                                ) }

                                    <p className={`text-lg font-semibold ${approvalClass}`}>
                                        {approvalText}
                                    </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RequestPurchaseComponent
