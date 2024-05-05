import Draft from "./Draft"
interface ListNFTProps {
    images: Draft[]
    isModalOpen: boolean
    linkNft: string
    copySuccess: boolean
    setLinkNft: (link: string) => void
    setIsModalOpen: (isOpen: boolean) => void
    setCopySuccess: (success: boolean) => void
    onProfile: boolean
}
export default ListNFTProps