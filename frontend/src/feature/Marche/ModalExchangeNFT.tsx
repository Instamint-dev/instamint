import ResponseNFT from "../../type/feature/nft/NFT.ts"
import  {useEffect, useState} from "react"
import {getDraftsPost} from "../NFT/PostNFT/service/PostNFTService.ts"
import ModalConfirm from "../../components/ModalConfirm.tsx"
import {exchangeNFT} from "./service/MarcheService.ts"

interface ModalExchangeNFTProps {
    setOpen: (open: boolean) => void
    nftWould: number|undefined

}
const ModalExchangeNFT = ( {setOpen,nftWould }: ModalExchangeNFTProps) => {
    const [nft, setNft] = useState<ResponseNFT>({ nfts: [] })
    const [modalConfirm, setModalConfirm] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [NFTIdExchange, setNFTIdExchange] = useState<number >(-1)


    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const drafts:ResponseNFT = await getDraftsPost()
                setNft(drafts)
            } catch (error) {
                throw new Error("Error getting drafts")
            }
        }
        fetchDrafts()
            .then(r => r)
            .catch((e: unknown) => e)
    } , [])

    useEffect(() => {
        const fetchDrafts = async () => {
            if (confirm) {
                await exchangeNFT(NFTIdExchange, nftWould || -1)
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
                    <h2 className="flex-1 text-lg font-semibold text-center">Report</h2>
                    <button className="flex-1 text-right text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => {setOpen(false)}}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </button>
                </header>
                <div className="flex flex-wrap justify-center items-center">
                    {nft.nfts.map((image) => (
                        <div key={image.id} className="relative w-full md:w-72 h-60 overflow-hidden rounded-md my-2 mx-1">
                            <img src={image.image} alt={`Draft ${String(image.id || "")}`} className="object-cover w-full h-full cursor-pointer" />
                            <div className="absolute bottom-2 right-2 space-x-2">
                                <button
                                    onClick={() => { setModalConfirm(true); setNFTIdExchange(image.id) }}
                                    className="bg-green-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded z-10">
                                    Exchange
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {modalConfirm && (
                    <ModalConfirm onClose={setModalConfirm} onConfirm={setConfirm} title={"Confirm Exchange"} message={"Would you like to exchange this NFT?"} show={modalConfirm} />
                )}
                {confirm && (
                    <div className="absolute bottom-0 right-0 bg-green-500 text-white font-bold py-1 px-2 rounded z-10">
                        <p>Exchange request sent</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default ModalExchangeNFT