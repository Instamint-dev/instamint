import React, {useState} from "react"
import CustomInput from "../../../../components/CustomInput"
import CommentComponentProps from "../../../../type/feature/nft/CommentComponentProps.ts"
import {deleteCommentNFT} from "../service/PostNFTService.ts"
import ModalReport from "../../../../components/ModalReport.tsx"



const CommentComponent: React.FC<CommentComponentProps> = ({
        comment,
        isAuthenticated,
        showReplyForm,
        commentReplies,
        toggleReplyForm,
        handleReplyChange,
        handleSubmitReply,
        formatDate,
       userProfile,
        setAction
   }) => {
    const [error, setError] = useState<string>()
    const [showModalReport, setShowModalReport] = useState(false)
    const [idCommentaryReport, setIdCommentaryReport] = useState<number>(-1)
    const handleDelete = async (commentId: number) => {
        const response = await deleteCommentNFT(commentId)
        if (response) {
            setTimeout(() => {
                setAction((prev) => prev + 1)
            }, 1000)
        } else {
            setError("Error deleting comment")
            setTimeout(() => {
                setError("")
            }, 1000)
        }
    }
    const openModalReport = (id: number) => {
        setShowModalReport(!showModalReport)
        setIdCommentaryReport(id)
    }

    return (
        <div key={comment.id} className="p-3 bg-gray-100 rounded-lg shadow mb-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src={comment.image} alt="profile" className="w-6 h-6 rounded-full" />
                    <p className="font-semibold">{comment.username}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">{formatDate(comment.date)}</span>
                    {isAuthenticated && comment.username === userProfile.username && (
                        <button onClick={() => handleDelete(comment.id)} className="text-red-600 hover:underline ml-2">
                            <svg className="h-6 w-6 text-slate-900" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </button>
                    )}
                </div>
            </div>
            <p className="mt-2 text-gray-800">{comment.message}</p>
            {isAuthenticated && (
                <div className="flex justify-between">
                    <button onClick={() => { toggleReplyForm(comment.id)}} className="text-blue-600 hover:underline mt-2">
                        Reply
                    </button>

                    {comment.username!==userProfile.username&&(
                    <button onClick={() => { toggleReplyForm(comment.id);openModalReport(comment.id)}} className=" hover:underline mt-2  px-4 py-2 rounded transition duration-150 ease-in-out text-green-500 focus:outline-none">
                       Report
                    </button>
                    )}
                </div>
            )}
            {showModalReport && (
                <ModalReport
                    setShowModalReport={setShowModalReport}
                    id={idCommentaryReport}
                    type={"commentary"}
                />)}
            {showReplyForm[comment.id] && (
                <form onSubmit={(e) => { handleSubmitReply(comment.id, e) }} className="mt-2">
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
                            <div>
                                <span className="text-xs text-gray-500">{formatDate(reply.date)}</span>
                                {isAuthenticated && reply.username === userProfile.username && (
                                    <button onClick={() => handleDelete(reply.id)} className="text-red-600 hover:underline ml-2">
                                        <svg className="h-6 w-6 text-slate-900" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                    </button>
                                )}
                            </div>
                        </div>
                        <p className="text-m text-gray-800">{reply.message}</p>
                        {isAuthenticated && (
                            <div className="flex justify-end mt-1">
                                 {reply.username!==userProfile.username&&(
                                    <button onClick={() => { toggleReplyForm(reply.id);openModalReport(reply.id)}} className="text-sm hover:underline rounded transition duration-150 text-green-500 focus:outline-none">
                                    Report
                                </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    )
}

export default CommentComponent