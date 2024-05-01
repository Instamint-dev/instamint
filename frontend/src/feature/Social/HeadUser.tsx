
import USER_TYPE from "../../type/request/User.ts"
import { useAuth } from "../../providers/AuthProvider.tsx"
const HeadUser = (user: USER_TYPE["user"]) => {
    const { isAuthenticated } = useAuth()
    return (
        <>
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto max-w-screen-lg px-4 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-center py-4">
                        <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-8">
                            <img className="rounded-full border-4 border-purple-500 p-1 h-32 w-32 lg:h-40 lg:w-40" src={user.userInfo.photo} alt="Profile picture of {user.userInfo.username}" />
                        </div>
                        <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                                <h2 className="text-2xl font-bold">{user.userInfo.username}</h2>
                                {isAuthenticated &&
                                    <div className="flex justify-between w-40">
                                        <button className="px-3 py-1 text-sm font-semibold border rounded text-black border-gray-300">Follow</button>
                                        <button className="px-3 py-1 text-sm font-semibold border rounded text-black border-gray-300">Message</button>
                                        {/* vérifier si la personne est amis avec nous, puis vérifier si elle a pas déjà une demande d'amis avec nous (retourner un int qui donne la situation) */}
                                    </div>
                                }
                            </div>
                            <div className="flex flex-wrap gap-4 justify-start mt-4">
                                <div className="text-center sm:text-left">
                                    <span className="font-bold">{user.nfts.length}</span> Posts
                                </div>
                                <div className="text-center sm:text-left">
                                    <span className="font-bold">{user.followers}</span> Followers
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