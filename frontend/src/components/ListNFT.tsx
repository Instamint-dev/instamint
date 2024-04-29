import ModalSocialMedias from "../feature/NFT/PostNFT/ModalSocialMedias"
import ListNFTProps from "../type/feature/nft/ListNFTProps"
import ResponseNFT from "../type/feature/nft/NFT"
import {getDraftsPost} from "../feature/NFT/PostNFT/service/PostNFTService"
const ListNFT = ({ images, isModalOpen, linkNft, copySuccess, setCopySuccess,setIsModalOpen,setLinkNft }: ListNFTProps) => {
    const handleCopyLink = async (id: number | undefined) => {
        const nftLink = await linkNFT(id)
        const fullLink = link + (nftLink ?? "")
        navigator.clipboard.writeText(fullLink)
            .then(() => {
                setCopySuccess(true)
                setTimeout(() => {
                    setCopySuccess(false)
                }, 2000)
            })
            .catch(() => {
                setCopySuccess(false)
            })
    }
    const linkNFT = async (id: number | undefined) => {
        const drafts: ResponseNFT = await getDraftsPost()
        const nftClick = drafts.nfts.find((nft) => nft.id === id)

        return nftClick?.link
    }
    const handleModalOpen = async (id: number | undefined) => {
        const linkOpen = await linkNFT(id)
        setLinkNft(linkOpen || "")
        setIsModalOpen(true)
    }
    const handleModalClose = () => {
        setIsModalOpen(false)
    }
    const link = `${window.location.origin}/nft/searchNFT/`
    
    return (
        <div className="flex flex-col items-center min-h-screen">
        <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map(image => (
                <div key={image.id} className="relative w-72 h-60 overflow-hidden rounded-md">
                    <img src={image.image} alt={`Draft ${String(image.id || "")}`}
                         className="object-cover w-full h-full"/>
                    <div className="absolute bottom-2 right-2 space-x-2">
                    </div>
                    <div className="absolute bottom-2 right-2 space-x-2">
                        <button onClick={() => handleCopyLink(image.id)} className="bg-black hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                            </svg>
                        </button>
                        <button onClick={() => handleModalOpen(image.id)} className="bg-green-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">
                            <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
        {isModalOpen && (
             <ModalSocialMedias handleModalClose={handleModalClose} link={link} linkNft={linkNft} />
        )}
        {copySuccess && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
                Link copied successfully!
            </div>
        )}
    </div>
    )
}

export default ListNFT