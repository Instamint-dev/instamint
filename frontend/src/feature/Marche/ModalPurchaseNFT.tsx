import ModalConfirm from "../../components/ModalConfirm.tsx"
import {useEffect, useState} from "react"
import ResponseSingleNFt from "../../type/feature/nft/ResponseSingleNFt.ts"
import { makeRequestPurchase} from "./service/MarcheService.ts"

interface ModalPurchaseNFTProps {
    setOpen: (open: boolean) => void
    nft: ResponseSingleNFt | undefined
}

const ModalPurchaseNFT = ({ setOpen, nft }: ModalPurchaseNFTProps) => {
    const [modalConfirm, setModalConfirm] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [offerPrice, setOfferPrice] = useState<string>((nft?.nft.price||0).toString())
    const [error , setError] = useState<string>("")
    const [response, setResponse] = useState<{status:boolean, message:string}>()
    const handlePurchase = () => {
        if (parseFloat(offerPrice) >= (nft?.nft.price||0)) {
            setError("")
            setModalConfirm(true)
        } else {
            setError("The price must be greater than the current price")
        }
    }

    useEffect(() => {
        const fetchDrafts = async () => {
            if (confirm) {
                const res=await makeRequestPurchase(nft?.nft.id||-1, Number(offerPrice))
                setResponse(res)
                setTimeout(() => {
                    setOpen(false)
                }, 1000)
            }
        }
        fetchDrafts()
            .then(r => r)
            .catch((e: unknown) => e)
    }, [confirm])

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <div className="relative p-8 bg-white w-128 h-128 m-auto flex-col flex rounded-lg">
                <header className="flex items-center justify-between w-full">
                    <div className="flex-1"></div>
                    <h2 className="flex-1 text-lg font-semibold text-center">Purchase</h2>
                    <button className="flex-1 text-right text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => { setOpen(false) }}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </header>
                <div className="flex flex-wrap justify-center items-center">
                    <div key={nft?.nft.id} className="relative w-full md:w-96 h-72 overflow-hidden rounded-md my-2 mx-1">
                        <img src={nft?.nft.image} alt={`NFT ${String(nft?.nft.id)}`} className="object-cover w-full h-full cursor-pointer" />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                            Price: ${nft?.nft.price||0}
                        </div>
                        <input type="number" placeholder="Enter your offer price" className="absolute bottom-10 left-2 w-28 bg-white px-2 py-1 rounded border border-gray-300"
                               value={offerPrice} onChange={e => {setOfferPrice(e.target.value)}} />
                        <button className="absolute bottom-2 right-2 bg-green-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
                                onClick={handlePurchase}>
                            Make Offer
                        </button>
                    </div>
                </div>
                {modalConfirm && (
                    <ModalConfirm onClose={() => {setModalConfirm(false)}} onConfirm={setConfirm} title="Confirm Purchase" message={`Do you want to make a purchase request for this NFT at $${offerPrice}?`} show={modalConfirm} />
                )}

                {response && (
                    <div
                        className={`absolute bottom-0 right-0 font-bold py-1 px-2 rounded z-10 ${
                            response.status ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}
                    >
                        <p>{response.status ? "Purchase request sent" : response.message}</p>
                    </div>
                )}

                {error && (
                    <div className="absolute bottom-0 right-0 bg-red-500 text-white font-bold py-1 px-2 rounded">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ModalPurchaseNFT
