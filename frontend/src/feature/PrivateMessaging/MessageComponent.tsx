import {ChangeEvent, FormEvent, useEffect, useState} from "react"
import {
    getEmojiList,
    getListMessages,
    getMessageWithUser,
    searchUserFollow,
    sendMessage
} from "./service/PrivateMessagingService.ts"
import { getDataProfil } from "../EditUser/service/EditUserService.ts"
import UserProfile from "../../type/feature/user/user_profil.ts"
import Navbar from "../navbar/navbar.tsx"
import ModalSearchUser from "./ModalSearchUser.tsx"
import ResponsePreviewMessage from "../../type/feature/PrivateMessaging/ResponsePreviewMessage.ts"
import ResponseMessageWithUser from "../../type/feature/PrivateMessaging/ResponseMessageWithUser.ts"
import PreviewMessage from "./PreviewMessage.tsx"
import Message from "./Message.tsx"
import EmojisType from "../../type/feature/PrivateMessaging/EmojisType.ts"

const MessageComponent = () => {
    const [showModal, setShowModal] = useState(false)
    const [previewMessages, setPreviewMessages] = useState<ResponsePreviewMessage[]>([])
    const [messageWithUser, setMessageWithUser] = useState<ResponseMessageWithUser[]>([])
    const [user, setUser] = useState<UserProfile>()
    const [newMessage, setNewMessage] = useState("")
    const [otherId, setOtherId] = useState<number>(0)
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
    const [refreshNeeded, setRefreshNeeded] = useState(0)
    const [userFollow, setUserFollow] = useState<UserProfile[]>([])
    const [searchUser, setSearchUser] = useState<string>("")
    const [emojis, setEmojis] = useState<EmojisType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const userTalk = await searchUserFollow(searchUser)
            setUserFollow(userTalk.userFollow)
        }

        fetchData().then(r => r).catch((e: unknown) => e)
    }, [searchUser])

    useEffect(() => {
        const fetchData = async () => {
            const emoji = await getEmojiList()
            setEmojis(emoji)
        }
        fetchData().then(r => r).catch((e: unknown) => e)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListMessages()
            const username = await getDataProfil()
            setUser(username)
            setPreviewMessages(response)
        }

        if (selectedConversation) {
            refreshMessages(selectedConversation).then(r => r).catch((e: unknown) => e)
        }

        fetchData().then(r => r).catch((e: unknown) => e)

        const intervalId = setInterval(() => {
            setRefreshNeeded(refreshNeeded + 1)
        }, 10000)

        return () => {clearInterval(intervalId)}
    }, [refreshNeeded])

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchUser(value)
    }
    const handleClick = async (id: number) => {
        setOtherId(id)
        await refreshMessages(id)
        setSelectedConversation(id)
    }
    const createDiscussion = async (id: number) => {
        toggleModal()
        setOtherId(id)
        await refreshMessages(id)
        setSelectedConversation(id)
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (newMessage.trim() !== "") {
            await sendMessage(otherId, newMessage)
            await handleClick(otherId)
            setNewMessage("")
            setRefreshNeeded(refreshNeeded + 1)
        }
    }
    const refreshMessages = async (id:number) => {
        const response = await getMessageWithUser(id)
        const sortedResponse = response.sort((a, b) => a.id - b.id)
        setMessageWithUser(sortedResponse)
    }
    const formatDate = (dateString:string) => {
        const date = new Date(dateString)

        return date.toLocaleString("en-US", {
            year: "numeric",
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        })
    }
    const toggleModal = () => {setShowModal(!showModal)}

    return (
        <><Navbar/>
            <div className="flex flex-col h-screen bg-gray-100">
                <div className="flex-grow sm:flex sm:flex-row">
                    <PreviewMessage
                        selectedConversation={selectedConversation}
                        previewMessages={previewMessages}
                        handleClick={handleClick}
                        toggleModal={toggleModal}
                        formatDate={formatDate}
                        user={user}
                    />
                    <Message
                        selectedConversation={selectedConversation}
                        messageWithUser={messageWithUser}
                        newMessage={newMessage}
                        toggleModal={toggleModal}
                        formatDate={formatDate}
                        user={user}
                        setSelectedConversation={setSelectedConversation}
                        handleSubmit={handleSubmit}
                        setNewMessage={setNewMessage}
                        emojis={emojis}
                    />

                    {showModal && (
                        <ModalSearchUser
                            toggleModal={toggleModal}
                            searchUser={searchUser}
                            handleSearch={handleSearch}
                            setSearchUser={setSearchUser}
                            createDiscussion={createDiscussion}
                            userFollow={userFollow}/>
                        )}

                </div>
            </div>
        </>
    )
}

export default MessageComponent
