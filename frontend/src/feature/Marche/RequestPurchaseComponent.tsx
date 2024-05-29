import { Link } from "react-router-dom"
import UserProfile from "../../type/feature/user/user_profil.ts"
import {changeStatusRequestPurchase, deleteRequestPurchase} from "./service/MarcheService.ts"
import RequestsPurchaseNFT from "../../type/feature/marche/RequestsPurchaseNFT.ts"
import {useState} from "react"
import ModalConfirm from "../../components/ModalConfirm.tsx"
import { useTranslation } from "react-i18next"
interface requestsReceivedProps {
    requestPurchaseNFT: RequestsPurchaseNFT | undefined
    user: UserProfile | undefined
    setAction?: (action: (prev: number) => number) => void
}

const RequestPurchaseComponent = ({ requestPurchaseNFT, user, setAction }: requestsReceivedProps) => {
    const { t } = useTranslation()
    const [modalConfirm, setModalConfirm] = useState(false)
    const [idDelete, setIdDelete] = useState<number>(-1)
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
                return {text: t("Purchase accepted"), className: "text-green-500"}
            } else if (isApproved === 0) {
                return {text: t("Purchase rejected"), className: "text-red-500"}
            } else if (isApproved === 2 && response) {
                return {text: t("Waiting for approval"), className: "text-black"}
            }

            return {text: "", className: ""}
    }
    const handleDelete = async () => {
        if (setAction) {
            setAction((prev) => prev + 1)
        }

        await deleteRequestPurchase(idDelete)
    }

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 justify-items-center items-center my-2">
                <h1>{t("Purchase Requests")}</h1>
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

                                {user?.username === request.buyer.username && request.is_approved === 2 && (
                                    <button
                                        className="top-2 right-2 text-red-500 hover:text-red-700"
                                        onClick={() => {setModalConfirm(true); setIdDelete(request.id)}}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <div className="mb-2">
                                <p className="text-lg">{t("Price")}: ${request.price}</p>
                            </div>
                            <div className="flex justify-center">
                                {user?.username===request.seller.username && request.is_approved === 2 && (
                                    <>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                            onClick={() => handleReject(request.id)}
                                        >
                                            {t("Reject")}
                                        </button>
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md mx-4"
                                            onClick={() => handleApprove(request.id)}
                                        >
                                            {t("Accept")}
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
                {modalConfirm && (
                        <ModalConfirm onClose={setModalConfirm} onConfirm={handleDelete} title={t("Confirm cancel")} message={t("Would you cancel this request?")} show={modalConfirm} />
                    )}
            </div>
        </div>
    )
}

export default RequestPurchaseComponent
