import CustomInput from "../../../../components/CustomInput.tsx"
import React, {useState} from "react"
import CommentAreaProps from "../../../../type/feature/nft/CommentAreaProps.ts"
import {addCommentNFT} from "../service/PostNFTService.ts"
import {useAuth} from "../../../../providers/AuthProvider.tsx"
import Filter from "bad-words"
import CommentComponent from "./CommentComponent.tsx"

const CommentArea: React.FC<CommentAreaProps> = ({
        comments,
         showComments,
        infoNft,
        setAction,
         userProfile
}) => {
    const [commentText, setCommentText] = useState("")
    const {isAuthenticated} = useAuth()
    const [displayedCommentsCount, setDisplayedCommentsCount] = useState(20)
    const [showReplyForm, setShowReplyForm] = useState<{ [key: number]: boolean }>({})
    const [commentReplies, setCommentReplies] = useState<{ [key: number]: string }>({})
    const [error, setError] = useState<string>("")
    const handleReplyChange = (commentId: number, value: string) => {
        setCommentReplies(prev => ({ ...prev, [commentId]: value }))
    }
    const toggleReplyForm = (commentId: number) => {
        setShowReplyForm(prev => ({ ...prev, [commentId]: !prev[commentId] }))
    }
    const handleSubmitReply = async (commentId: number, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const replyText = commentReplies[commentId]
        const filter = new Filter()
        const filteredCommentText = filter.clean(replyText)
        const mentions = (filteredCommentText.match(/@\w+/gu) || []).map(mention => mention.substring(1))
        if (mentions.length <= 3) {
            if (filteredCommentText.length <= 300) {
                const response = await addCommentNFT({idNFT:infoNft?.nft.id || -1, message:filteredCommentText, idParentCommentary:commentId,mentions})
                if (response) {
                    setAction(prev => prev + 1)
                }

                setError("")
            } else {
                setError("The comment must be less than 300 characters")
            }
        } else {
            setError("You can mention only 3 people")
        }

        setCommentReplies(prev => ({ ...prev, [commentId]: "" }))
        toggleReplyForm(commentId)
    }
    const handleLoadMoreComments = () => {
        setDisplayedCommentsCount(prev => prev + 20)
    }
    const handleSubmitComment = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const idParentCommentary = 0
        const filter = new Filter()
        const filteredCommentText = filter.clean(commentText)
        const mentions = (filteredCommentText.match(/@\w+/gu) || []).map(mention => mention.substring(1))
        if (mentions.length <= 3) {
            if (filteredCommentText.length <= 300) {
                const response = await addCommentNFT({idNFT:infoNft?.nft.id || -1, message:filteredCommentText, idParentCommentary,mentions})

                if (response) {
                    setAction(prev => prev + 1)
                }

                setCommentText("")
                setError("")
            } else {
                setError("The comment must be less than 300 characters")
            }
        } else {
            setError("You can mention only 3 people")
        }
    }
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value)
    }
    const formatDate = (isoDateString:string) => {
        const date = new Date(isoDateString)

        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        })
    }



    return (
        <div className="mt-4">
            {showComments && (
                <div className="mt-4">
                    {isAuthenticated && (
                        <form onSubmit={handleSubmitComment} className="mb-4"><CustomInput type="text" placeholder="Write a comment on this NFT..." value={commentText} onChange={handleCommentChange} id="nft-comment" name="nft-comment" disabled={false}
                            />
                            <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Post Comment
                            </button>
                        </form>
                    )}
                    {comments.comments.slice(0, displayedCommentsCount).map((comment) => (
                        <CommentComponent
                            key={comment.id}
                            comment={comment}
                            isAuthenticated={isAuthenticated}
                            showReplyForm={showReplyForm}
                            commentReplies={commentReplies}
                            toggleReplyForm={toggleReplyForm}
                            handleReplyChange={handleReplyChange}
                            handleSubmitReply={handleSubmitReply}
                            formatDate={formatDate}
                            userProfile={userProfile}
                            setAction={setAction}
                        />))}
                    {Number(comments.comments.length) > displayedCommentsCount && (
                        <button onClick={handleLoadMoreComments} className="mt-2 text-blue-600 hover:underline">
                            Load more comments
                        </button>
                    )}
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}

export default CommentArea