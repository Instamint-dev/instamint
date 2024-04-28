import  { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getDrafts , deleteDraft} from "./service/NFTService.ts"
import Draft from "../../../type/feature/nft/Draft.ts"
import ModalDelete from "./ModalDelete.tsx"
import ResponseNFT from "../../../type/feature/nft/NFT.ts"

const DraftsNFT = () => {
    const [images, setImages] = useState<Draft[]>([])
    const [showModal, setShowModal] = useState(false)
    const [idDraft, setIdDraft] = useState<number>(-1)
    const [deletionCount,setDeletionCount  ] = useState(0)
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
        <>
        <div className="flex flex-col items-center min-h-screen">
            <div className="grid grid-cols-1 gap-4 mt-4">
                {images.map((image) => (
                    <div key={image.id} className="relative w-full overflow-hidden rounded-md">
                        <img src={image.image} alt={`Draft ${String(image.id || "")}`} className="object-cover w-full h-60 md:h-full" />
                        <div className="absolute bottom-2 right-2 space-x-2 z-10">
                            <div className="flex items-center space-x-2">
                                <Link to={"/nft/createDraft/"} state={{ id: image.id }}>
                                    <button className="bg-green-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">
                                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>
                                </Link>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded" onClick={() => {
                                    setShowModal(true);
                                    setIdDraft(image.id || -1);
                                }}>
                                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-4 right-4">
                <Link to="/nft/createDraft">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center z-10" style={{ backgroundColor: "#1E90FF" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m-4-8h8" />
                        </svg>
                    </button>
                </Link>
            </div>


        <ModalDelete showModal={showModal} setShowModal={setShowModal} onDelete={handleDelete}
                             idDraft={idDraft}/>

            </div>
        </>
    )
}

export default DraftsNFT
