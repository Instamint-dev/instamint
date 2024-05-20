import UserProfile from "../../type/feature/user/user_profil.ts"
import ResponseMessageWithUser from "../../type/feature/PrivateMessaging/ResponseMessageWithUser.ts"
import {FormEvent} from "react"

interface MessageProps {
    selectedConversation: number | null
    messageWithUser: ResponseMessageWithUser[]
    newMessage: string
    toggleModal: () => void
    formatDate: (date: string) => string
    user:UserProfile | undefined
    setSelectedConversation: (id: number | null) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    setNewMessage: (message: string) => void
}

const Message = ({selectedConversation, messageWithUser, setSelectedConversation, formatDate,user,newMessage,handleSubmit,setNewMessage}: MessageProps) => (
        <>
            {selectedConversation ? (
                <div className={`sm:w-3/4 p-5 flex flex-col flex-grow`}>
                    <div className="flex justify-between mb-4">
                        <button onClick={() => {setSelectedConversation(null)}} className="text-blue-500">Back</button>
                        <p className="font-semibold text-center flex-grow">{messageWithUser[0]?.otherUsername}</p>
                    </div>
                    <div className="overflow-auto">
                        {messageWithUser[0].content ? (
                            messageWithUser.map((message,index) => (
                                <div
                                    key={message.id}
                                    className={`p-3 mb-2 ${message.senderId === user?.id ? "bg-blue-200 ml-auto" : "bg-gray-200 mr-auto"} rounded-xl rounded-${message.senderId === user?.id ? "tr" : "tl"}-xl rounded-${message.senderId === user?.id ? "bl" : "br"}-xl`}
                                    style={{
                                        minHeight: "50px",
                                        maxWidth: message.senderId === user?.id ? "70%" : "60%"
                                    }}
                                >
                                    <p className="font-semibold">{message.content}</p>
                                    <p className="text-xs text-gray-400">{formatDate(message.sendDate)}</p>
                                    {index === messageWithUser.length - 1 && message.senderId === user?.id && (
                                        <p className="text-xs">{message.read ? "Read" : "Unread"}</p>
                                    )}
                                </div>

                            ))
                        ) : (
                            <div className="text-center text-gray-500">
                                No messages in this conversation yet.
                            </div>
                        )}
                    </div>
                    {messageWithUser.length !== 0 && (
                        <div className="fixed bottom-0 left-0 right-0">
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => {setNewMessage(e.target.value)}}
                                        placeholder="Write a message..."
                                        className="border-2 border-gray-300 rounded-lg resize-none p-2 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        style={{minHeight: "80px"}}
                                    />
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out mt-auto"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full w-full">
                    <img src="../../../src/assets/logo-instamint.svg" alt="Placeholder"
                         className="w-1/4 h-1/3"/>
                </div>
            )}
        </>
    )


export default Message