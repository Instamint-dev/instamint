
import { useEffect, useState, MouseEventHandler } from "react"
import USER_TYPE from "../../type/request/User.ts"
import { useAuth } from "../../providers/AuthProvider.tsx"
import { followInformations, followUser } from "./service/Social.ts"
import { useParams } from "react-router-dom"
const HeadUser = (user: USER_TYPE["user"]) => {
    const { isAuthenticated } = useAuth()
    const [followButton, setFollowButton] = useState<number>(0)
    const { link } = useParams()
    const [followers, setFollowers] = useState<number>(0)
    useEffect(() => {
        if (isAuthenticated) {
            const follow = async () => {
                try {
                    const etatFollow = await followInformations(link || "")
                    setFollowButton(etatFollow.return)
                    setFollowers(user.followers)
                } catch (e: unknown) {
                    throw new Error("Error following user")
                }
            }
            void follow()
        }
    }, [isAuthenticated, link, user.followers])
    const handleFollow: MouseEventHandler = () => {
        const performFollow = async () => {
            let userLink = link || ""
            if (user.userInfo.link) {
                userLink = user.userInfo.link
            }

            try {
                const follow = await followUser(userLink, followButton)
                setFollowButton(follow.return)                
                if (follow.return === 2) {
                    setFollowers(followers + 1)
                } else if (follow.return === 3) {
                    setFollowers(followers - 1)
                }else if (follow.return === 5) {
                    location.reload()
                }
            }
            catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message)
                } else {
                    throw new Error("An unknown error occurred")
                }
            }
        }
        void performFollow()
    }
    const followRenderButton = () => {
        switch (followButton) {
            case 6:

                return <button onClick={handleFollow} className="px-3 py-1 text-sm font-semibold border rounded text-black border-gray-300">Unfollow</button>

            case 2:

                return <button onClick={handleFollow} className="px-3 py-1 text-sm font-semibold border rounded text-black border-gray-300">Unfollow</button>

            case 3:

                return <button onClick={handleFollow} className="px-3 py-1 text-sm font-semibold border rounded text-black border-gray-300">Follow</button>

            case 4:

                return <button onClick={handleFollow} className="px-3 py-1 text-sm font-semibold border rounded text-black border-gray-300">Wait</button>

            case 5:

                return <button onClick={handleFollow} className="px-3 py-1 text-sm font-semibold border rounded text-black border-gray-300">Send follow Request</button>

            default:

                return <></>
        }
    }

    return (
        <>
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto max-w-screen-lg px-4 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-center py-4">
                        <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-8">
                            <img className="rounded-full border-4 border-purple-500 p-1 h-32 w-32 lg:h-40 lg:w-40" src={user.userInfo.image} alt={`Profile picture of ${user.userInfo.username}`} />
                        </div>
                        <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                <h2 className="text-2xl font-bold">{user.userInfo.username}</h2>
                                {isAuthenticated &&
                                    <div className="flex justify-between w-40">
                                        {followRenderButton()}
                                    </div>
                                }
                            </div>
                            <div className="flex flex-wrap gap-4 justify-start mt-4">
                                <div className="text-center sm:text-left">
                                    <span className="font-bold">{user.nfts.length}</span> Posts
                                </div>
                                <div className="text-center sm:text-left">
                                    <span className="font-bold">{followers}</span> Followers
                                </div>
                                <div className="text-center sm:text-left">
                                    <span className="font-bold">{user.following}</span> Following
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="font-medium">{user.userInfo.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeadUser