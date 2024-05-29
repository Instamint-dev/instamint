import ResponseMessageWithUser from "./ResponseMessageWithUser.ts"
import UserProfile from "../user/user_profil.ts"
import React, {FormEvent} from "react"
import EmojisType from "./EmojisType.ts"

interface MessageProps {
    selectedConversation: number | null
    messageWithUser: ResponseMessageWithUser[]
    newMessage: string
    toggleModal: () => void
    formatDate: (date: string) => string
    user:UserProfile | undefined
    setSelectedConversation: (id: number | null) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>|React.KeyboardEvent<HTMLTextAreaElement>) => void
    setNewMessage: (message: string) => void
    emojis: EmojisType[]
}

export default MessageProps