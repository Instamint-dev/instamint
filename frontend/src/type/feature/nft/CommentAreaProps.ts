import {CommentsType} from "./CommentsType.ts"
import React from "react"

interface CommentAreaProps{
    comments: { comments: CommentsType[] }
    showComments: boolean
    infoNft?: { nft: { id: number } }
    setAction: React.Dispatch<React.SetStateAction<number>>

}

export default CommentAreaProps
