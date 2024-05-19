import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {
    getListMessages,
    getMessageWithUser,
    searchUserFollow,
    sendMessage
} from "./service/PrivateMessagingService.ts";
import { getDataProfil } from "../EditUser/service/EditUserService.ts";
import UserProfile from "../../type/feature/user/user_profil.ts";
import Navbar from "../navbar/navbar.tsx";
import {Link} from "react-router-dom";
import ModalSearchUser from "./ModalSearchUser.tsx";

const MessageComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [previewMessages, setPreviewMessages] = useState<ResponsePreviewMessage[]>([]);
    const [messageWithUser, setMessageWithUser] = useState<ResponseMessageWithUser[]>([]);
    const [user, setUser] = useState<UserProfile>();
    const [newMessage, setNewMessage] = useState('');
    const [otherId, setOtherId] = useState<number>(0);
    const [selectedConversation, setSelectedConversation] = useState<number | null>(null); // Nouvel état pour gérer la conversation sélectionnée
    const [refreshNeeded, setRefreshNeeded] = useState(0);
    const [userFollow, setUserFollow] = useState<UserProfile[]>([]);
    const [searchUser, setSearchUser] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const userFollow = await searchUserFollow(searchUser);
            setUserFollow(userFollow.userFollow);
        };

        fetchData().then(r => r).catch((e: unknown) => e);
    }, [searchUser])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getListMessages();
            const user = await getDataProfil();
            setUser(user);
            setPreviewMessages(response);
        };

        fetchData().then(r => r).catch((e: unknown) => e);

        const intervalId = setInterval(() => {
            setRefreshNeeded(refreshNeeded + 1);
        }, 30000);

        return () => clearInterval(intervalId);
    }, [refreshNeeded]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchUser(value);
    };

    const handleClick = async (otherId: number) => {
        const response = await getMessageWithUser(otherId,);
        setOtherId(otherId)
        const sortedResponse = response.sort((a, b) => a.id - b.id); // Trie par ID du plus petit au plus grand
        setMessageWithUser(sortedResponse);
        setSelectedConversation(otherId);
    };

    const createDiscussion = async (otherId: number) => {
        toggleModal()
        const response = await getMessageWithUser(otherId);
        setOtherId(otherId)
        const sortedResponse = response.sort((a, b) => a.id - b.id); // Trie par ID du plus petit au plus grand
        setMessageWithUser(sortedResponse);
        setSelectedConversation(otherId);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("User clicked on user with id:", otherId! + " and send message: " + newMessage);
        if (newMessage.trim() !== '') {
            await sendMessage(otherId, newMessage);
            await handleClick(otherId);
            setNewMessage('');
            setRefreshNeeded(refreshNeeded + 1);

        }
    };

    const formatDate = (dateString:string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const toggleModal = () => setShowModal(!showModal);

// console.log(userFollow)
    return (
        <><Navbar/>
            <div className="flex flex-col h-screen bg-gray-100">
                <div className="flex-grow sm:flex sm:flex-row">
                    {!selectedConversation && (
                        <div className="sm:w-1/4 bg-white overflow-auto p-5 border-r flex flex-col">
                            <h1 className="text-xl font-semibold mb-4">Messages</h1>
                            <ul>
                                {previewMessages.map(message => (
                                    <li
                                        key={message.id}
                                        onClick={() => handleClick(message.otherId)}
                                        className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer`}
                                    >
                                        <Link to={`/user/${message.otherUsername}`}>
                                            <img src={message.otherImage} alt={message.otherUsername}
                                                 className="w-10 h-10 rounded-full mr-3"/>
                                        </Link>
                                        <div>
                                            <p className="font-semibold">{message.otherUsername}</p>
                                            <p className="text-sm text-gray-500">{message.content.substring(0, 20)}</p>
                                            <p className="text-xs text-gray-400">{formatDate(message.sendDate)}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto">
                                <button onClick={toggleModal}
                                        className="p-2 w-full text-center bg-blue-800 text-white rounded hover:bg-green-600">
                                    + Send message
                                </button>
                            </div>
                        </div>

                    )}
                    {selectedConversation && (
                        <div className={`sm:w-3/4 p-5 flex flex-col flex-grow`}>
                            <div className="flex justify-between mb-4">
                                <button onClick={() => setSelectedConversation(null)} className="text-blue-500">Back</button>
                                <p className="font-semibold text-center flex-grow">{messageWithUser[0]?.otherUsername}</p>
                            </div>
                            <div className="overflow-auto">
                                {messageWithUser[0].content ? (
                                    messageWithUser.map(message => (
                                        <div
                                            key={message.id}
                                            className={`p-3 mb-2 ${message.senderId === user?.id ? 'bg-blue-200 ml-auto' : 'bg-gray-200 mr-auto'} rounded-xl rounded-${message.senderId === user?.id ? 'tr' : 'tl'}-xl rounded-${message.senderId === user?.id ? 'bl' : 'br'}-xl`}
                                            style={{
                                                minHeight: '50px',
                                                maxWidth: message.senderId === user?.id ? '70%' : '60%'
                                            }}
                                        >
                                            <p className="font-semibold">{message.content}</p>
                                            <p className="text-xs text-gray-400">{formatDate(message.sendDate)}</p>
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
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write a message..."
                        className="border-2 border-gray-300 rounded-lg resize-none p-2 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        style={{minHeight: '80px'}}
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
                    )}
                    {!selectedConversation && (
                        <div className="flex items-center justify-center h-full w-full">
                            <img src="../../../src/assets/logo-instamint.svg" alt="Placeholder"
                                 className="w-1/4 h-1/3"/>
                        </div>
                    )}

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
    );
}

export default MessageComponent;