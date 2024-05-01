export interface CommentsType {

    id: number;
    id_nft: number;
    message: string;
    date: string;
    id_parent_commentary: number;
    username: string;
    image: string;
    replies: CommentsType[]; // Include replies as an array of Comment
}

export interface CommentsTypeResponse {
    comments: CommentsType[]
}

// export default CommentsTypeResponse