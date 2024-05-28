import ResponsePreviewMessage from "./ResponsePreviewMessage.ts"
import UserProfile from "../user/user_profil.ts"

interface PreviewMessageProps {
    selectedConversation: number | null
    previewMessages: ResponsePreviewMessage[]
    handleClick: (otherId: number) => void
    toggleModal: () => void
    formatDate: (date: string) => string
    user:UserProfile | undefined
}

export default PreviewMessageProps