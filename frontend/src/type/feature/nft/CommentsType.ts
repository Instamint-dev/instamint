export interface CommentsType {

    id: number;
    id_nft: number;
    message: string;
    date: string;
    id_parent_commentary: number;
    username: string;
    image: string;
    replies: CommentsType[];
}

export interface CommentsTypeResponse {
    comments: CommentsType[]
}

