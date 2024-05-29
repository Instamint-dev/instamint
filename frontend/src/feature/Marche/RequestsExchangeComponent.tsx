import RequestsExchangeNFTResponse from "../../type/feature/marche/RequestsExchangeNFT.ts"
import UserProfile from "../../type/feature/user/user_profil.ts"
import {changeStatusRequest, deleteRequestExchange} from "./service/MarcheService.ts"
import {Link} from "react-router-dom"
import ModalConfirm from "../../components/ModalConfirm.tsx"
import {useState} from "react"
import { useTranslation } from "react-i18next"
interface requestsReceivedProps {
    requestExchangeNFT: RequestsExchangeNFTResponse | undefined
    user:UserProfile | undefined
    setAction?: (action: (prev: number) => number) => void

}

const RequestsExchangeComponent=({requestExchangeNFT,user,setAction}:requestsReceivedProps) => {
    const [modalConfirm, setModalConfirm] = useState(false)
    const [idDelete, setIdDelete] = useState<number>(-1)
    const { t } = useTranslation()
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
    const handleDelete = async () => {
        if (setAction) {
            setAction((prev) => prev + 1)
        }

        await deleteRequestExchange(idDelete)
    }
    const getStatusClass = (isApproved: number | null) => {
        if (isApproved === 1) {
            return "text-green-500"
        } else if (isApproved === 0) {
            return "text-red-500"
        }

        return ""
    }
    const getStatusText = (isApproved: number | null) => {
        if (isApproved === 1) {
            return t("Exchange accepted")
        } else if (isApproved === 0) {
            return t("Exchange refused")
        }

        return ""
    }


    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 justify-items-center items-center my-2">
            <h1>{t("Exchange")}</h1>
                {requestExchangeNFT?.requestsExchangeNFT.map((request) => (
                    <div key={request.id} className="bg-gray-100 p-2 rounded-lg shadow-md w-2/5 my-1">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-lg font-semibold">{user?.username!==request.minter.username?request.minter.username:t("Your NFT")}</p>
                                <Link to={`/nft/searchNFT/${request.nftPropose.link}`}>
                                    <img src={request.nftPropose.image} alt={request.nftPropose.link} className="w-24 h-24 rounded-lg mt-2" />
                                </Link>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{user?.username !== request.minter.username ? t("Your NFT") : request.minter.username}</p>
                                <Link to={`/nft/searchNFT/${request.nft_minter_would.link}`}>
                                    <img src={request.nft_minter_would.image} alt={request.minter.username} className="w-24 h-24 rounded-lg mt-2" />
                                </Link>
                            </div>
                            {user?.username === request.minter.username && request.isApproved === 2 && (
                                <button
                                    className="top-2 right-2 text-red-500 hover:text-red-700"
                                    onClick={() => {setModalConfirm(true);setIdDelete(request.id)}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className="flex justify-center">
                            {user?.username !== request.minter.username && request.isApproved === 2 ? (
                                <>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleReject(request.id)}
                                    >
                                        {t("Reject")}
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded-md mx-4 "
                                        onClick={() => handleApprove(request.id)}
                                    >
                                        {t("Accept")}
                                    </button>
                                </>
                            ) : user?.username === request.minter.username && request.isApproved === 2 && (
                                <p className="text-lg font-semibold">{t("Waiting for approval")}</p>
                            )}

                            <p className={`text-lg font-semibold ${getStatusClass(request.isApproved)}`}>
                                {getStatusText(request.isApproved)}
                            </p>

                        </div>
                    </div>
                ))}
                {modalConfirm && (
                    <ModalConfirm onClose={setModalConfirm} onConfirm={handleDelete} title={t("Confirm cancel")} message={t("Would you cancel this request?")} show={modalConfirm} />
                )}
            </div>
        </div>
    )
}

export default RequestsExchangeComponent