interface ResponsePreviewMessage{
    id: number,
    otherUsername: string,
    otherId: number,
    otherImage: string,
    content: string,
    sendDate: string,
    senderId: number,
    read: boolean,
}

export default ResponsePreviewMessage