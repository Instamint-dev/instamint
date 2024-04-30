import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ifUserLikedNFT, searchNFT} from "./service/NFTService.ts"
import ResponseSingleNFT from "../../../type/feature/nft/ResponseSingleNFt.ts"
import Navbar from "../../navbar/navbar.tsx"
import {useAuth} from "../../../providers/AuthProvider.tsx"
import {getCommentsNFT, LikeNFT} from "../PostNFT/service/PostNFTService.ts"
import NotLike from "../PostNFT/NotLike.tsx"
import Like from "../PostNFT/Like.tsx"
import CommentsTypeResponse from "../../../type/feature/nft/CommentsType.ts"
import CustomInput from "../../../components/CustomInput.tsx";

 function NftDetail() {
    const {link} = useParams()
    const [success, setSuccess] = useState<boolean>(true)
    const [infoNft, setInfoNft] = useState<ResponseSingleNFT>()
    const [action, setAction] = useState<number>(0)
    const {isAuthenticated} = useAuth()
     const [comments, setComments] = useState<CommentsTypeResponse>({ comments: [] });
     const [showComments, setShowComments] = useState(false)
     const [displayedCommentsCount, setDisplayedCommentsCount] = useState(20);  // Track number of displayed comments
     const [comment, setComment] = useState("");  // State to hold the comment input


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const nft: ResponseSingleNFT = await searchNFT(link || "")

                const comments =await  getCommentsNFT(nft.nft.id)
                setComments(comments)

                console.log(comments)
                if (isAuthenticated) {
                    const isLiked = await ifUserLikedNFT(nft.nft.id)
                    setInfoNft({
                        ...nft,
                        username: nft.username,
                        isLiked: isAuthenticated ? isLiked.isLiked : false
                    })
                }else{
                    setInfoNft({
                        ...nft,
                        username: nft.username,
                        isLiked: false
                    })
                }


            } catch (err: unknown) {
                setSuccess(false)
            }
        }
        fetchUserProfile().then(r => r).catch((e: unknown) => e)
    }, [action,infoNft?.mint])


    const handleLike = async () => {
        console.log("like")

        if (isAuthenticated) {
            console.log("like 2")
            const response = await LikeNFT(infoNft?.nft.id || -1)
            if (response) {

            } else {
            }

            setAction(action + 1)

        }

    }

    console.log(infoNft?.isLiked)

    if (!success) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-2xl font-bold">Loading...</h2>
                <img className="w-20 h-20 animate-spin"
                     src="https://instamintkami.blob.core.windows.net/instamint/UUq.gif" alt="Loading GIF"/>
            </div>
        )
    }

     const handleLoadMoreComments = () => {
         const nextCount = displayedCommentsCount + 20;
         setDisplayedCommentsCount(nextCount);
     };

     const handleSubmitComment = async (event: React.FormEvent<HTMLFormElement>) => {
         event.preventDefault();
         console.log("Submitting comment:", comment);
         // Here you would typically send the comment to your server or API
         // await postComment(comment);
         setComment('');  // Clear the input field after submission
     };


     const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
         setComment(event.target.value);
     };



     return (
         <>
             <Navbar />
             <div className="flex justify-center">
                 <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl w-full">
                     <div className="flex justify-between items-center p-4">
                         <span className="text-sm font-semibold text-gray-600">{infoNft?.nft.place}</span>
                         <span className="bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full">+10%</span>
                     </div>
                     <div className="relative w-full">
                         <img className="w-full h-auto" src={infoNft?.nft.image} alt={`NFT ${infoNft?.nft.image}`} />
                     </div>

                     <div className="p-4">
                         <div className="p-4 flex justify-between items-center">
                             <span className="text-lg font-semibold">@{infoNft?.username}</span>
                             <div className="flex items-center space-x-2">
                                 {infoNft?.isLiked ? (
                                     <Like onClick={handleLike} numberOfLike={infoNft?.mint} />
                                 ) : (
                                     <NotLike onClick={handleLike} numberOfLike={infoNft?.mint} />
                                 )}
                                 <button className="flex items-center focus:outline-none">
                                 </button>

                                 <button
                                     className="flex items-center focus:outline-none"
                                 >
                                     <svg
                                         className="h-8 w-8 text-black-500"
                                         viewBox="0 0 24 24"
                                         strokeWidth="2"
                                         stroke="currentColor"
                                         fill="none"
                                         strokeLinecap="round"
                                         strokeLinejoin="round"
                                     >
                                         <path stroke="none" d="M0 0h24v24H0z"/>
                                         <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"/>
                                         <line x1="12" y1="12" x2="12" y2="12.01"/>
                                         <line x1="8" y1="12" x2="8" y2="12.01"/>
                                         <line x1="16" y1="12" x2="16" y2="12.01"/>
                                     </svg>
                                     <span className="text-sm text-gray-500 ml-2">{0}</span>
                                 </button>
                             </div>
                         </div>
                         <p className="text-sm text-gray-600 mt-2">{infoNft?.nft.description}</p>
                         <div className="flex flex-wrap gap-2 mt-2">
                             {infoNft?.nft.hashtags.split(" ").map((hashtag, index) => (
                                 <span key={index} className="text-xs font-medium text-blue-500 bg-blue-100 px-2 py-1 rounded">
                                #{hashtag}
                            </span>
                             ))}
                         </div>


                     </div>
                     <div className="mt-4">
                         <button
                             onClick={() => setShowComments(!showComments)}
                             className="text-blue-600 hover:underline"
                         >
                             {showComments ? 'Hide comments' : `Show comments (${comments?.comments?.length})`}
                         </button>

                         {showComments && (
                             <>
                                 {/* Comment input form */}
                                 <div className="mt-4">
                                     <form onSubmit={handleSubmitComment}>
                                         <CustomInput
                                             type="text"
                                             placeholder="Write a comment..."
                                             value={comment}
                                             onChange={handleCommentChange}
                                             id="comment"
                                             name="comment"
                                             disabled={false}
                                         />
                                         <button
                                             type="submit"
                                             className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                         >
                                             Post Comment
                                         </button>
                                     </form>
                                 </div>

                                 <div className="mt-4 space-y-4">
                                     {comments?.comments?.slice(0, displayedCommentsCount).map((comment, index) => (
                                         <div key={index} className="p-3 bg-gray-100 rounded-lg shadow">
                                             <div className="flex items-center justify-between">
                                                 <div className="flex items-center space-x-2">
                                                     <img
                                                         src={comment.image}
                                                         alt="profile"
                                                         className="w-6 h-6 rounded-full"
                                                     />
                                                     <p className="font-semibold">{comment.username}</p>
                                                 </div>
                                                 <span className="text-sm text-gray-500">{comment.date}</span>
                                             </div>
                                             <p className="mt-2 text-gray-800">{comment.message}</p>
                                         </div>
                                     ))}
                                 </div>

                                 {Number(comments?.comments?.length) > displayedCommentsCount && (
                                     <button
                                         onClick={handleLoadMoreComments}
                                         className="mt-2 text-blue-600 hover:underline"
                                     >
                                         Load more comments
                                     </button>
                                 )}

                                 <div className="mt-2 text-gray-600">
                                     Total: {comments?.comments?.length} comments
                                 </div>
                             </>
                         )}
                     </div>



                 </div>
             </div>
         </>
     );


 }
export default NftDetail
