import Like from "./Like.tsx"
import NotLike from "./NotLike.tsx"
import React from "react"
import ResponseSingleNFT from "../../../../type/feature/nft/ResponseSingleNFt.ts"

interface Props {
setShowComments: (showComments: boolean) => void
showComments: boolean
totalCommentsCount: number
infoNft: ResponseSingleNFT | undefined
handleLike: () => void

}
const ComponentInfoNFT: React.FC<Props> = ({ infoNft, setShowComments, showComments, totalCommentsCount, handleLike }) => (
        <div className="p-4">
            <div className="p-4 flex justify-between items-center">
                <span className="text-lg font-semibold">@{infoNft?.username}</span>
                <div className="flex items-center space-x-2">
                    {infoNft?.isLiked ? (
                        <Like onClick={handleLike} numberOfLike={infoNft.mint} />
                    ) : (
                        <NotLike onClick={handleLike} numberOfLike={infoNft?.mint} />
                    )}
                    <button className="flex items-center focus:outline-none" onClick={() => { setShowComments(!showComments) }}>
                        <svg className="h-8 w-8 text-black-500" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/><path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"/><line x1="12" y1="12" x2="12" y2="12.01"/><line x1="8" y1="12" x2="8" y2="12.01"/><line x1="16" y1="12" x2="16" y2="12.01"/>
                        </svg>
                        <span className="text-sm text-gray-500 ml-2">{totalCommentsCount}</span>
                    </button>
                </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{infoNft?.nft.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {infoNft?.nft.hashtags.split(" ").map((hashtag, index) => (
                    <span key={index} className="text-xs font-medium text-blue-500 bg-blue-100 px-2 py-1 rounded">#{hashtag}</span>
                ))}
            </div>
        </div>
    )

export default ComponentInfoNFT