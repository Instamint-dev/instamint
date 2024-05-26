import RequestsExchangeNFTResponse from "../../type/feature/marche/RequestsExchangeNFT.ts"
import UserProfile from "../../type/feature/user/user_profil.ts"
import {changeStatusRequest} from "./service/MarcheService.ts"
import {Link} from "react-router-dom"

interface requestsReceivedProps {
    requestExchangeNFT: RequestsExchangeNFTResponse | undefined
    user:UserProfile | undefined
    setAction?: (action: (prev: number) => number) => void

}

const requestsExchangeComponent=({requestExchangeNFT,user,setAction}:requestsReceivedProps) => {
    const handleApprove = async (id: number) => {
        if (setAction) {
            setAction((prev) => prev + 1)
        }

        await changeStatusRequest(id, 1)
    }
    const handleReject = async (id: number) => {
        if (setAction) {
            setAction((prev) => prev + 1)
        }

       await changeStatusRequest(id, 0)
    }


    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 justify-items-center items-center my-2">
            <h1>Exchange</h1>
                {requestExchangeNFT?.requestsExchangeNFT.map((request) => (
                    <div key={request.id} className="bg-gray-100 p-2 rounded-lg shadow-md w-2/5 my-1">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-lg font-semibold">{user?.username!==request.minter.username?request.minter.username:"Your NFT "}</p>
                                <Link to={`/nft/searchNFT/${request.nftPropose.link}`}>
                                    <img src={request.nftPropose.image} alt={request.nftPropose.link} className="w-24 h-24 rounded-lg mt-2" />
                                </Link>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{user?.username !== request.minter.username ? "Your NFT" : request.minter.username}</p>
                                <Link to={`/nft/searchNFT/${request.nft_minter_would.link}`}>
                                    <img src={request.nft_minter_would.image} alt={request.minter.username} className="w-24 h-24 rounded-lg mt-2" />
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            {user?.username !== request.minter.username && request.isApproved === 2 ? (
                                <>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleReject(request.id)}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-md mx-4 "
                                        onClick={() => handleApprove(request.id)}
                                    >
                                        Accept
                                    </button>
                                </>
                            ) : user?.username === request.minter.username && request.isApproved === 2 && (
                                <p className="text-lg font-semibold">Waiting for approval</p>
                            )}

                            <p className={`text-lg font-semibold ${request.isApproved === 1 ? "text-green-500" : "text-red-500"}`}>
                                {request.isApproved === 1 ? "Exchange accepted" : ""}
                            </p>

                        </div>


                    </div>
                ))}
            </div>
        </div>
    )
}

export default requestsExchangeComponent