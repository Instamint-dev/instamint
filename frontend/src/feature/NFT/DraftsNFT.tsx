import  { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getDrafts } from "./service/NFTService.ts"
import Draft from "../../type/feature/nft/Draft.ts"
import ModalDelete from "./ModalDelete.tsx"
import ResponseNFT from "../../type/feature/nft/NFT.ts"
import {deleteDraft} from "./service/NFTService"

const DraftsNFT = () => {
    const [images, setImages] = useState<Draft[]>([])
    const [showModal, setShowModal] = useState(false)
    const [idDraft, setIdDraft] = useState<number>(-1)
    const [deletionCount, setDeletionCount] = useState(0)
    const handleDelete = async (id?: number) => {
        if (typeof id !== "undefined") {
            setIdDraft(id)
            await deleteDraft(id)
            setDeletionCount(deletionCount + 1)
            setShowModal(!showModal)
        }
    }


    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const drafts:ResponseNFT = await getDrafts()
                const imagesList = drafts.nfts.map((item) => ({
                    id: item.id,
                    image: item.image || ""
                }))
                setImages(imagesList)
            } catch (error) {
                throw new Error("Error getting drafts")
            }
        }

        fetchDrafts()
            .then(r => r)
            .catch((e: unknown) => e)
    }, [deletionCount])


    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="fixed bottom-4 right-4">
                <Link to="/nft/createDraft">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center" style={{ backgroundColor: "green" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m-4-8h8"/>
                        </svg>
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map(image => (
                    <div key={image.id} className="relative w-72 h-60 overflow-hidden rounded-md">
                        <img src={image.image} alt={`Draft ${String(image.id || "")}`} className="object-cover w-full h-full" />
                        <div className="absolute bottom-2 right-2 space-x-2">
                            <Link to={`/nft/createDraft/${typeof image.id !== "undefined" ? image.id.toString() : "-1"}`}>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">Edit</button>
                            </Link>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"     onClick={() => { setShowModal(true);setIdDraft(image.id||-1) }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ModalDelete showModal={showModal} setShowModal={setShowModal} onDelete={handleDelete} idDraft={idDraft} />

        </div>
    )
}

export default DraftsNFT
