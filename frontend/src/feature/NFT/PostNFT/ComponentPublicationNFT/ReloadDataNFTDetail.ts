import ResponseSingleNFT from "../../../../type/feature/nft/ResponseSingleNFt.ts";
import {ifUserLikedNFT, searchNFT} from "../../DraftNFT/service/NFTService.ts";
import {getCommentsNFT} from "../service/PostNFTService.ts";
import {CommentsType} from "../../../../type/feature/nft/CommentsType.ts";

export const reloadDataNFTDetail = async ( link: string, isAuthenticated: boolean, setInfoNft: React.Dispatch<React.SetStateAction<ResponseSingleNFT | undefined>>, setComments: React.Dispatch<React.SetStateAction<{ comments: CommentsType[] }>>) => {

    try {
        const nft: ResponseSingleNFT = await searchNFT(link || "");
        const commentsBdd = await getCommentsNFT(nft.nft.id);
        const nestedComments = nestComments(commentsBdd.comments);
        setComments({ comments: nestedComments });
        if (isAuthenticated) {
            const isLiked = await ifUserLikedNFT(nft.nft.id);
            setInfoNft({
                ...nft,
                username: nft.username,
                isLiked: isLiked.isLiked
            });
        } else {
            setInfoNft({
                ...nft,
                username: nft.username,
                isLiked: false
            });
        }
    } catch (err) {
        console.error("Failed to reload NFT data", err);
    }
};

export const nestComments = (commentsList: CommentsType[]): CommentsType[] => {
    const commentMap: { [key: number]: CommentsType } = {}

    commentsList.forEach(comment => {
        commentMap[comment.id] = { ...comment, replies: [] }
    })

    const nestedComments: CommentsType[] = []
    commentsList.forEach(comment => {
        if (comment.id_parent_commentary !== 0) {
            commentMap[comment.id_parent_commentary].replies.push(commentMap[comment.id])
        } else {
            nestedComments.push(commentMap[comment.id])
        }
    })

    return nestedComments
}