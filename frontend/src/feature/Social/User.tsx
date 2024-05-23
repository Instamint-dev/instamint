import { useParams } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { useEffect, useState } from "react"
import { getUser, isFollowPrivate } from "./service/Social.ts"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import USER_TYPE from "../../type/request/User.ts"
import ListNFT from "../../components/ListNFT.tsx"
import HeadUser from "./HeadUser.tsx"
import { useAuth } from "../../providers/AuthProvider.tsx"
import ResponseNFT from "../../type/feature/nft/NFT.ts"
import {getDraftsPost} from "../NFT/PostNFT/service/PostNFTService.ts"
const User = ({ linkProfile = "" }: { linkProfile?: string } = {}) => {
    const { link } = useParams()
    const [success, setSuccess] = useState(false)
    const { isAuthenticated } = useAuth()
    const initialState: USER_TYPE["user"] = {
        followers: 0,
        following: 0,
        nfts: [],
        status: "",
        isTeaBag: false,
        userInfo: { username: "", image: "", bio: "", link: "" ,id: 0}
    }
    const [user, setUser] = useState(initialState)
    const [linkNft, setLinkNft] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [copySuccess, setCopySuccess] = useState(false)
    const [visibleNft, setVisibleNft] = useState(false)
    useEffect(() => {
        try {
            const getUserInfo = async () => {
                const infos: USER_TYPE = await getUser(link || linkProfile)
                setSuccess(infos.return)
                setUser(infos.user)
            }
            void getUserInfo()                        
            if (isAuthenticated) { 
                const follow = async () => {
                    const followPrivate = await isFollowPrivate(link || linkProfile)
                    if (followPrivate.return === 1) {
                        setVisibleNft(true)
                        const drafts:ResponseNFT = await getDraftsPost(link)
                        const imagesList = drafts.nfts.map((item) => ({
                            id: item.id,
                            image: item.image || ""
                        }))
                        setUser((prev) => ({ ...prev, nfts: imagesList }))
                    }
                }
                void follow()
            }
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                setSuccess(false)
            }
        }
    }, [])
    if (!success) {
        return (
            <>
                <Navbar />
                <div className="flex items-center flex-col">
                    <h1>Your user does not exist</h1>
                </div>
            </>
        )
    }

    return (
        <><Navbar />
            <div className="flex items-center flex-col">
                <div id="header">
                    <HeadUser isTeaBag={user.isTeaBag} followers={user.followers} following={user.following} userInfo={user.userInfo} nfts={user.nfts} status={user.status} />
                </div>
                {
                    user.status === "public" || visibleNft?
                        <>
                            <div id="nfts">
                                <ListNFT
                                    images={user.nfts}
                                    isModalOpen={isModalOpen}
                                    linkNft={linkNft}
                                    copySuccess={copySuccess}
                                    setLinkNft={setLinkNft}
                                    setIsModalOpen={setIsModalOpen}
                                    setCopySuccess={setCopySuccess}
                                    onProfile={true}
                                />
                            </div>
                        </>
                        :
                        <>
                            <div className="flex items-center flex-col">
                                <h1>Private profile</h1>
                            </div>
                        </>
                }

            </div>
        </>
    )
}

export default User