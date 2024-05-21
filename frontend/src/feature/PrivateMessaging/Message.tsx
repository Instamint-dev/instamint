import UserProfile from "../../type/feature/user/user_profil.ts"
import ResponseMessageWithUser from "../../type/feature/PrivateMessaging/ResponseMessageWithUser.ts"
import {FormEvent, useState} from "react"
import EmojisType from "../../type/feature/PrivateMessaging/EmojisType.ts"

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
    emojis: EmojisType[]
}

const Message = ({selectedConversation, messageWithUser, setSelectedConversation, formatDate,user,newMessage,handleSubmit,setNewMessage,emojis}: MessageProps) => {
    const toggleEmojiPicker = () => {setShowEmojis(!showEmojis)}
    const [showEmojis, setShowEmojis] = useState(false)
    const handleEmojiClick = (emoji: EmojisType) => {
        setNewMessage(`${newMessage}${emoji.alias}`)
    }
    function getEmojiUrlById(alias: string) {
        return  emojis.find(emoji => emoji.alias === alias)?.name
    }

    function transformMessage(message:string) {
        const emojiRegex = /emoji::(\d+)/gu

        return message.replace(emojiRegex, (alias) => {
            const url = getEmojiUrlById(alias)||""

            return `<img src="${url}" alt="${url}" class="inline h-6 w-6 align-middle mr-1" />`
        })
    }

    return (
        <>
            {selectedConversation ? (
                <div className={`sm:w-3/4 p-5 flex flex-col flex-grow`}>
                    <div className="flex justify-between mb-4">
                        <button onClick={() => {setSelectedConversation(null)}} className="text-blue-500">Back</button>
                        <p className="font-semibold text-center flex-grow">{messageWithUser[0]?.otherUsername}</p>
                    </div>
                    <div className="flex flex-col h-screen">
                        <div className="overflow-y-auto mb-24 flex-grow">

                        {messageWithUser[0].content ? (
                            messageWithUser.map((message,index) => (
                                <div
                                    key={message.id}
                                    className={`p-3 mb-2 ${message.senderId === user?.id ? "bg-blue-200 ml-auto" : "bg-gray-200 mr-auto"} rounded-xl`}
                                    style={{ minHeight: "50px", maxWidth: message.senderId === user?.id ? "70%" : "60%" }}
                                >
                                    <p className="font-semibold" dangerouslySetInnerHTML={{ __html: transformMessage(message.content) }}></p>
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
                    </div>

                    {messageWithUser.length !== 0 && (
                        <div className="fixed bottom-0 left-0 right-0 bg-white p-2 shadow-lg">
                            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-2 p-1 mx-4 mb-4 bg-white rounded-md shadow">
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => {setNewMessage(e.target.value)}}
                                        placeholder="Write a message..."
                                        className="flex-1 border-2 border-gray-300 rounded-lg resize-none p-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        style={{ minHeight: "80px" }}
                                    />

                                    <button
                                        onClick={toggleEmojiPicker}
                                        className="p-2 text-xl  text-white rounded-full hover:bg-blue-600 focus:outline-none"
                                    >
                                        😊
                                    </button>
                                    <button
                                        type="submit"
                                        className="text-white font-bold p-2 rounded transition duration-150 ease-in-out"
                                        style={{ backgroundColor: "rgb(31, 41, 55)"}}

                                    >
                                        Send
                                    </button>
                                </div>
                            </form>

                            {showEmojis && (
                                <div className="absolute bottom-14 right-2 bg-white p-2 shadow-lg rounded-lg flex space-x-2">
                                    {emojis.map((emoji) => (
                                        <button
                                            key={emoji.id}
                                            onClick={() => {handleEmojiClick(emoji)}}
                                            className="p-2"
                                        >
                                            <img src={emoji.name} alt={emoji.alias} className="h-5 w-5" />
                                        </button>
                                    ))}
                                </div>
                            )}
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
}



export default Message