import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ResponseSingleNFT from "../../../type/feature/nft/ResponseSingleNFt.ts"
import {useAuth} from "../../../providers/AuthProvider.tsx"
import { likeNFT} from "./service/PostNFTService.ts"
import NotLike from "./ComponentPublicationNFT/NotLike.tsx"
import Like from "./ComponentPublicationNFT/Like.tsx"
import {CommentsTypeResponse} from "../../../type/feature/nft/CommentsType.ts"
import CommentArea from "./ComponentPublicationNFT/CommentArea.tsx"
import Navbar from "../../navbar/navbar.tsx"
import {reloadDataNFTDetail} from "./ComponentPublicationNFT/ReloadDataNFTDetail.ts"
import {reloadDataNFTFeed} from "./ComponentPublicationNFT/ReloadDataNFTFeed.tsx"

interface Params {
    nftParams:ResponseSingleNFT
    setActionParam: (action: (prev: number) => number) => void
}

const NftDetail: React.FC<Params> = ({ nftParams,setActionParam }) => {
    const {link} = useParams()
    const [success, setSuccess] = useState<boolean>(true)
    const [infoNft, setInfoNft] = useState<ResponseSingleNFT>()
    const [action, setAction] = useState<number>(0)
    const {isAuthenticated} = useAuth()
    const [comments, setComments] = useState<CommentsTypeResponse>({ comments: [] })
    const [showComments, setShowComments] = useState(false)
    const totalCommentsCount = comments.comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0)



     useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (typeof nftParams === "undefined") {
                    await reloadDataNFTDetail({ link: link || "", isAuthenticated, setInfoNft, setComments });
                }
                else{
                    await reloadDataNFTFeed({ nftParams, isAuthenticated, setInfoNft, setComments });
                }
            } catch (err: unknown) {
                setSuccess(false)
            }
        }
        fetchUserProfile().then(r => r).catch((e: unknown) => e)
    }, [action,infoNft?.mint, isAuthenticated, link, nftParams])


     const handleLike = async () => {
         if (isAuthenticated) {
             if (typeof nftParams === "undefined") {
                 await likeNFT(infoNft?.nft.id || -1)
                 setAction(prev => prev + 1)
             }else {
                    await likeNFT(nftParams.nft.id||-1)
                    setActionParam((prev: number) => prev + 1)
             }
         }
     }

    if (!success) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <p className="text-xl font-bold mb-4">NFT NOT FOUND</p>
                <img
                    src="https://instamintkami.blob.core.windows.net/instamint/waiting.gif"
                    alt="Loading GIF"
                />
            </div>
        )
    }

     return (
         <>
             {typeof nftParams === "undefined" && (
                 <Navbar/>
             )}
             <div className="flex justify-center">
                 <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl w-full">
                     <div className="flex justify-between items-center p-4">
                         <span className="text-sm font-semibold text-gray-600">{infoNft?.nft.place}</span>
                         <span className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">+10%</span>
                     </div>
                     <div className="relative w-full">
                         <img className="w-full h-auto" src={infoNft?.nft.image || ""} alt={`NFT ${infoNft?.nft.image || ""}`} />
                     </div>
                     <div className="p-4">
                         <div className="p-4 flex justify-between items-center">
                             <span className="text-lg font-semibold">@{infoNft?.username}</span>
                             <div className="flex items-center space-x-2">
                                 {infoNft?.isLiked ? (
                                     <Like onClick={handleLike} numberOfLike={infoNft.mint} />
                                 ) : (
                                     <NotLike onClick={handleLike} numberOfLike={infoNft?.mint} />
                                 )}

                                 <button className="flex items-center focus:outline-none" onClick={() => { setShowComments(!showComments) }}>
                                     <svg className="h-8 w-8 text-black-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                         <path stroke="none" d="M0 0h24v24H0z"/>
                                         <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"/>
                                         <line x1="12" y1="12" x2="12" y2="12.01"/>
                                         <line x1="8" y1="12" x2="8" y2="12.01"/>
                                         <line x1="16" y1="12" x2="16" y2="12.01"/>
                                     </svg>
                                     <span className="text-sm text-gray-500 ml-2">{totalCommentsCount}</span>
                                 </button>
                             </div>

                         </div>
                         <p className="text-sm text-gray-600 mt-2">{infoNft?.nft.description}</p>
                         <div className="flex flex-wrap gap-2 mt-2">
                             {infoNft?.nft.hashtags.split(" ").map((hashtag, index) => (
                                 <span key={index} className="text-xs font-medium text-blue-500 bg-blue-100 px-2 py-1 rounded">#{hashtag}</span>
                             ))}
                         </div>

                     </div>
                        <CommentArea comments={comments} showComments={showComments} infoNft={infoNft} setAction={setAction}/>
                 </div>
             </div>
         </>
     )
 }
export default NftDetail
