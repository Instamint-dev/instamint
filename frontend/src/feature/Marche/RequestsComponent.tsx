
import RequestsExchangeNFTResponse from "../../type/feature/marche/RequestsExchangeNFT.ts";
import UserProfile from "../../type/feature/user/user_profil.ts";

interface requestsReceivedProps {
    RequestsExchangeNFTResponse: RequestsExchangeNFTResponse | undefined
    user:UserProfile | undefined

}

const requestsComponent=({RequestsExchangeNFTResponse,user}:requestsReceivedProps) => {



    const handleApprove = (id: number) => {
      console.log("Approve request with ID", id)
    };

    const handleReject = (id: number) => {
        console.log("Reject request with ID", id)
    };


    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 justify-items-center items-center my-2">
                {RequestsExchangeNFTResponse?.requestsExchangeNFT.map((request) => (
                    <div key={request?.id} className="bg-gray-100 p-2 rounded-lg shadow-md w-2/5 my-1">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-lg font-semibold">{user?.username!==request?.minter.username?request?.minter.username:"You"}</p>
                                <img src={request?.nftPropose?.image} alt={request?.nftPropose.link} className="w-24 h-24 rounded-lg mt-2" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{user?.username!==request?.minter.username?"Your NFT":"NFT you would like to have"}</p>

                                <img src={request?.nft_minter_would?.image} alt={request?.minter.username} className="w-24 h-24 rounded-lg mt-2" />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            {user?.username !==request?.minter.username && request?.isApproved === null ? (
                                <>
                                    <button
                                        className={`bg-red-500 text-white px-4 py-2 rounded-md ${''}`}
                                        onClick={() => handleReject(request?.id)}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className={`bg-green-500 text-white px-4 py-2 rounded-md mx-4 ${''}`}
                                        onClick={() => handleApprove(request?.id)}
                                    >
                                        Accept
                                    </button>
                                </>
                            ):(
                                <p className="text-lg font-semibold">Waiting for approval</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default requestsComponent