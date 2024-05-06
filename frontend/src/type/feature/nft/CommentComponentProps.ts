import {CommentsType} from "./CommentsType.ts"
import React from "react"
import UserProfile from "../user/user_profil.ts"

interface CommentComponentProps {
    comment: CommentsType
    isAuthenticated: boolean
    showReplyForm: { [key: number]: boolean }
    commentReplies: { [key: number]: string }
    toggleReplyForm: (commentId: number) => void
    handleReplyChange: (commentId: number, value: string) => void
    handleSubmitReply: (commentId: number, event: React.FormEvent<HTMLFormElement>) => void
    formatDate: (isoDateString: string) => string
    userProfile: UserProfile
    setAction: React.Dispatch<React.SetStateAction<number>>
}

export default CommentComponentProps