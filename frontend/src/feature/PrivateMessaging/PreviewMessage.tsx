import {Link} from "react-router-dom"
import ResponsePreviewMessage from "../../type/feature/PrivateMessaging/ResponsePreviewMessage.ts"
import UserProfile from "../../type/feature/user/user_profil.ts"

interface PreviewMessageProps {
    selectedConversation: number | null
    previewMessages: ResponsePreviewMessage[]
    handleClick: (otherId: number) => void
    toggleModal: () => void
    formatDate: (date: string) => string
    user:UserProfile | undefined
}

const PreviewMessage = ({selectedConversation, previewMessages, handleClick, toggleModal, formatDate,user}: PreviewMessageProps) => (
    <>
        {!selectedConversation && (
        <div className="sm:w-1/4 bg-white overflow-auto p-5 border-r flex flex-col">
            <h1 className="text-xl font-semibold mb-4">Messages</h1>
            <ul>
                {previewMessages.map(message => (
                    <li
                        key={message.id}
                        onClick={() => {handleClick(message.otherId)}}
                        className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer`}
                    >
                        <Link to={`/user/${message.otherUsername}`}>
                            <img src={message.otherImage} alt={message.otherUsername}
                                 className="w-10 h-10 rounded-full mr-3"/>
                        </Link>
                        <div>
                            <p className="font-semibold">{message.otherUsername}</p>
                            <p className={`text-sm ${message.senderId !== user?.id && !message.read ? "font-bold text-black" : "text-gray-500"}`}>
                                {message.content.substring(0, 20)}
                            </p>
                            <p className="text-xs text-gray-400">{formatDate(message.sendDate)}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="fixed bottom-0  ">
                <button onClick={toggleModal}
                        className="p-3 w-full text-center  text-white rounded hover:bg-green-600"
                        style={{ backgroundColor: "rgb(31, 41, 55)"}}
                >
                    + Send message
                </button>
            </div>
        </div>
        )}
    </>
)


export default PreviewMessage