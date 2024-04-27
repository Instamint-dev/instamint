import {useEffect, useState} from "react";
import Draft from "../../../type/feature/nft/Draft.ts";
import ResponseNFT from "../../../type/feature/nft/NFT.ts";
import {getDraftsPost} from "./service/PostNFTService.ts";
import {
    EmailIcon,
    EmailShareButton, FacebookIcon,
    FacebookShareButton, LinkedinIcon,
    LinkedinShareButton, TwitterIcon,
    TwitterShareButton, WhatsappIcon,
    WhatsappShareButton
} from "react-share";

const NFTPost = () => {
    const [images, setImages] = useState<Draft[]>([])
    const link=window.location.origin+"/nft/searchNFT/"
    const [linkNft, setLinkNft] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                const drafts:ResponseNFT = await getDraftsPost()
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
    }, [])

    const handleCopyLink = async (id: number | undefined) => {
        const nftLink = await LinkNFT(id);
        const fullLink = link + nftLink;
        navigator.clipboard.writeText(fullLink)
            .then(() => {
                console.log("Lien copié dans le presse-papiers");
            })
            .catch((error) => {
                console.error("Erreur lors de la copie du lien:", error);
            });
    };

    const LinkNFT = async (id: number | undefined) => {
        const drafts: ResponseNFT = await getDraftsPost()
        const nftclick = drafts.nfts.find((nft) => nft.id === id)
        return nftclick?.link
    }

    const handleModalOpen = async (id: number | undefined) => {
        const link = await LinkNFT(id);
        setLinkNft(link || ""); // Assure-toi que link est une chaîne de caractères
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);

    };


  return (
   <>
       <div className="flex flex-col items-center min-h-screen">
           <div className="grid grid-cols-3 gap-4 mt-4">
               {images.map(image => (
                   <div key={image.id} className="relative w-72 h-60 overflow-hidden rounded-md">
                       <img src={image.image} alt={`Draft ${String(image.id || "")}`}
                            className="object-cover w-full h-full"/>
                       <div className="absolute bottom-2 right-2 space-x-2">
                       </div>

                       <div className="absolute bottom-2 right-2 space-x-2">

                           <div className="absolute bottom-2 right-2 space-x-2">

                           </div>
                           <button onClick={() => handleCopyLink(image?.id)} className="bg-black hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">
                               <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                               </svg>
                           </button>

                           <button onClick={() => handleModalOpen(image?.id)} className="bg-green-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">
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
               <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                   <div className="bg-white p-4 rounded-md">
                       <div className="flex items-center mb-4">
                           <div className="mr-2">
                               <FacebookIcon className="h-6 w-6 text-blue-500" />
                           </div>
                           <FacebookShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                               Facebook
                           </FacebookShareButton>
                       </div>
                       <div className="flex items-center mb-4">
                           <div className="mr-2">
                               <TwitterIcon className="h-6 w-6 text-blue-500" />
                           </div>
                           <TwitterShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                               Twitter
                           </TwitterShareButton>
                       </div>
                       <div className="flex items-center mb-4">
                           <div className="mr-2">
                               <LinkedinIcon className="h-6 w-6 text-blue-500" />
                           </div>
                           <LinkedinShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                               LinkedIn
                           </LinkedinShareButton>
                       </div>
                       <div className="flex items-center mb-4">
                           <div className="mr-2">
                               <EmailIcon className="h-6 w-6 text-blue-500" />
                           </div>
                           <EmailShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                               Email
                           </EmailShareButton>
                       </div>
                       <div className="flex items-center mb-4">
                           <div className="mr-2">
                               <WhatsappIcon className="h-6 w-6 text-blue-500" />
                           </div>
                           <WhatsappShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                               WhatsApp
                           </WhatsappShareButton>
                       </div>
                       <button onClick={handleModalClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                           Close
                       </button>
                   </div>
               </div>

           )}
       </div>
   </>
  )
}

export default NFTPost
