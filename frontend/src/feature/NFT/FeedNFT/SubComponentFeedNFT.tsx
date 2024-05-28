import React, { useEffect, useState } from "react"
import { getNFTsFeed, getNFTSFeedFollow } from "./service/FeedNFTService.ts"
import ResponseSingleNFt from "../../../type/feature/nft/ResponseSingleNFt.ts"
import NftDetail from "../PostNFT/NftDetail.tsx"

interface SubComponentNFTProps {
    tab: string
}

const SubComponentFeedNFT: React.FC<SubComponentNFTProps> = ({ tab }) => {
    const [nfts, setNfts] = useState<ResponseSingleNFt[]>([])
    const [action, setAction] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                let nftsList: ResponseSingleNFt[] = []
                if (tab === "ForYou") {
                    nftsList = await getNFTsFeed()
                } else {
                    nftsList = await getNFTSFeedFollow()
                }

                setNfts(nftsList)
            } catch (err) {
                throw new Error("Failed to fetch NFTs")
            } finally {
                setLoading(false)
            }
        }

        fetchNFTs().then(r => r).catch((e: unknown) => e)
    }, [tab, action])

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY

            if (scrollTop > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <img
                    src="https://instamintkami.blob.core.windows.net/instamint/waiting.gif"
                    alt="Loading GIF"
                />
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {nfts.map((nft, index) => (
                <div key={index} className="mb-4">
                    <NftDetail setActionParam={setAction} nftParams={nft} />
                </div>
            ))}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed top-5 right-5 text-white font-bold py-2 px-2 rounded transition duration-150 ease-in-out flex items-center"
                    style={{ backgroundColor: "rgb(31, 41, 55)"}}

                >
                    <svg className="h-6 w-6"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="16 12 12 8 8 12" />
                        <line x1="12" y1="16" x2="12" y2="8" />
                    </svg>
                </button>

            )}
        </div>
    )
}

export default SubComponentFeedNFT
