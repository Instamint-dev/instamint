import {CommentsType} from "./CommentsType.ts"
import React from "react"
import UserProfile from "../user/user_profil.ts"

interface CommentAreaProps{
    comments: { comments: CommentsType[] }
    showComments: boolean
    infoNft?: { nft: { id: number } }
    setAction: React.Dispatch<React.SetStateAction<number>>
    userProfile:UserProfile
}

export default CommentAreaProps
