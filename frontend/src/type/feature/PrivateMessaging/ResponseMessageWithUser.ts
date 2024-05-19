interface ResponseMessageWithUser {
    id: number
    content: string
    sendDate: string
    receiverId: number
    senderId: number
    otherUsername: string
}

export default ResponseMessageWithUser