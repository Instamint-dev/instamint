interface CommentsType {

    id: number;
    id_nft: number;
    message: string;
    date: string;
    id_parent_commentary: number;
    username: string;
    image: string;
}

interface CommentsTypeResponse {
    comments: CommentsType[];
}

export default CommentsTypeResponse;