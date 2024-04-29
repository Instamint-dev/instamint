import { useParams } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { useEffect, useState } from "react"
import { getUser } from "./service/Social.ts"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import USER_TYPE from "../../type/request/User.ts"
import ListNFT from "../../components/ListNFT.tsx"
const User = () => {
    const { link } = useParams()
    const [error, setError] = useState(false)
    const initialState: USER_TYPE["user"] = {
            followers: 0,
            following: 0,
            nfts: [],
            status: "",
            infosUser: { username: "", photo: "", bio: "", lien: "" }
        }
    const [user, setUser] = useState(initialState)
    const [linkNft, setLinkNft] = useState<string>("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [copySuccess, setCopySuccess] = useState<boolean>(false)
    useEffect(() => {
        try {
            const getUserInfo = async () => {
                const infos: USER_TYPE = await getUser(link || "")
                setError(infos.return)
                setUser(infos.user)
            }
            getUserInfo().then(r => r).catch((e: unknown) => e)
        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                setError(false)
            }
        }
    }, [user])
    return (
        <>
            <Navbar />
            <div className="flex items-center flex-col">
                {error ?
                    <>
                        <div id="header">
                            <div id="logo + follow">
                                <div id="gauche logo"></div>
                                <div id="droite post follow follow bio">
                                    <div id="post follow follow"></div>
                                    <div id="bio"></div>
                                </div>
                            </div>
                            <div id="btn follow followed"></div>
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
                    </>
                    :
                    <h1>Your user does not exit</h1>
                }

            </div>
        </>
    )
}

export default User