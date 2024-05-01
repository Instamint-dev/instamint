import CustomInput from "../../../../components/CustomInput.tsx"
import React, {useState} from "react"
import CommentAreaProps from "../../../../type/feature/nft/CommentAreaProps.ts"
import {addCommentNFT} from "../service/PostNFTService.ts"

const CommentArea: React.FC<CommentAreaProps> = ({
        comments,
         showComments,
        infoNft,
        setAction,

}) => {
    const [commentText, setCommentText] = useState("")
    const [displayedCommentsCount, setDisplayedCommentsCount] = useState(20)
    const [showReplyForm, setShowReplyForm] = useState<{ [key: number]: boolean }>({})
    const [commentReplies, setCommentReplies] = useState<{ [key: number]: string }>({})
    const handleReplyChange = (commentId: number, value: string) => {
        setCommentReplies(prev => ({ ...prev, [commentId]: value }))
    }
    const toggleReplyForm = (commentId: number) => {
        setShowReplyForm(prev => ({ ...prev, [commentId]: !prev[commentId] }))
    }
    const handleSubmitReply = async (commentId: number, event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const replyText = commentReplies[commentId]
        const response =await addCommentNFT(infoNft?.nft.id || -1, replyText, commentId)
        if (response) {
            setAction(prev => prev + 1)
        }

        setCommentReplies(prev => ({ ...prev, [commentId]: "" }))
        toggleReplyForm(commentId)
    }
    const handleLoadMoreComments = () => {
        setDisplayedCommentsCount(prev => prev + 20)
    }
    const handleSubmitComment =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const idParentCommentary = 0
        const response =await addCommentNFT(infoNft?.nft.id || -1, commentText, idParentCommentary)

        if (response) {
            setAction(prev => prev + 1)
        }

        setCommentText("")
    }
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value)
    }

    return (
        <div className="mt-4">
            {showComments && (
                <div className="mt-4">
                    <form onSubmit={handleSubmitComment} className="mb-4">
                        <CustomInput
                            type="text"
                            placeholder="Write a comment on this NFT..."
                            value={commentText}
                            onChange={handleCommentChange}
                            id="nft-comment"
                            name="nft-comment"
                            disabled={false}
                        />
                        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Post Comment
                        </button>
                    </form>
                    {comments.comments.slice(0, displayedCommentsCount).map((comment) => (
                        <div key={comment.id} className="p-3 bg-gray-100 rounded-lg shadow mb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <img src={comment.image} alt="profile" className="w-6 h-6 rounded-full" />
                                    <p className="font-semibold">{comment.username}</p>
                                </div>
                                <span className="text-sm text-gray-500">{comment.date}</span>
                            </div>
                            <p className="mt-2 text-gray-800">{comment.message}</p>
                            <button onClick={() => { toggleReplyForm(comment.id)}} className="text-blue-600 hover:underline">Reply</button>
                            {showReplyForm[comment.id] && (
                                <form onSubmit={(e) => { void handleSubmitReply(comment.id, e) }} className="mt-2">
                                    <CustomInput
                                        type="text"
                                        placeholder="Reply..."
                                        value={commentReplies[comment.id] || ""}
                                        onChange={(e) => { handleReplyChange(comment.id, e.target.value) }}
                                        id={`reply-${comment.id.toString()}`}
                                        name={`reply-${comment.id.toString()}`}
                                        disabled={false}
                                    />
                                    <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                        Post Reply
                                    </button>
                                </form>
                            )}
                            <div className="ml-8 mt-2">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="bg-white p-2 rounded-lg shadow my-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <img src={reply.image} alt="profile" className="w-5 h-5 rounded-full" />
                                                <p className="font-semibold text-sm">{reply.username}</p>
                                            </div>
                                            <span className="text-xs text-gray-500">{reply.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-800">{reply.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {Number(comments.comments.length) > displayedCommentsCount && (
                        <button onClick={handleLoadMoreComments} className="mt-2 text-blue-600 hover:underline">
                            Load more comments
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default CommentArea