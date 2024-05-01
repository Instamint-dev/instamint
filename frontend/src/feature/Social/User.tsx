import { useParams } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { useEffect, useState } from "react"
import { getUser } from "./service/Social.ts"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import USER_TYPE from "../../type/request/User.ts"
import ListNFT from "../../components/ListNFT.tsx"
import HeadUser from "./HeadUser.tsx"
const User = () => {
    const { link } = useParams()
    const [success, setSuccess] = useState(false)
    const initialState: USER_TYPE["user"] = {
        followers: 0,
        following: 0,
        nfts: [],
        status: "",
        userInfo: { username: "", photo: "", bio: "", lien: "" }
    }
    const [user, setUser] = useState(initialState)
    const [linkNft, setLinkNft] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [copySuccess, setCopySuccess] = useState<boolean>(false)
    useEffect(() => {
        try {
            const getUserInfo = async () => {
                const infos: USER_TYPE = await getUser(link || "")
                setSuccess(infos.return)
                setUser(infos.user)
            }
            getUserInfo()
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
                    <HeadUser followers={user.followers} following={user.following} userInfo={user.userInfo} nfts={user.nfts} status={user.status}/>
                </div>
                <div id="nfts">
                    <ListNFT
                        images={user.nfts}
                        isModalOpen={isModalOpen}
                        linkNft={linkNft}
                        copySuccess={copySuccess}
                        setLinkNft={setLinkNft}
                        setIsModalOpen={setIsModalOpen}
                        setCopySuccess={setCopySuccess}
                    />
                </div>
            </div>
        </>
    )
}

export default User