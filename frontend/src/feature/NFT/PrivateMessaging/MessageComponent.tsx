import { useState } from 'react';

// Mock data for messages
const messages = [
    { id: 1, name: 'Person 1', lastMessage: 'Hey, how are you?' },
    { id: 2, name: 'Person 2', lastMessage: 'Meeting tomorrow?' }
];

// MessageComponent
const MessageComponent = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Simulate fetching search results (you'd replace this with actual API call logic)
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Placeholder for search logic
        if (value.startsWith("@")) {
            setSearchResults(["@user1", "@user2", "@user3"].filter(username => username.includes(value)));
        } else {
            setSearchResults([]);
        }
    };
    // Function to toggle the new message modal
    const toggleModal = () => setShowModal(!showModal);

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 bg-white p-5 border-r">
                <h1 className="text-xl font-semibold">Messages</h1>
                <ul>
                    {messages.map(message => (
                        <li key={message.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                            {message.name}: {message.lastMessage}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={toggleModal}
                    className="mt-4 p-2 w-full text-center text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    + Envoyer un message
                </button>
            </div>
            <div className="w-3/4 p-5">
                <div className="h-full flex flex-col justify-between">
                    <div className="flex-1">
                        <p>Welcome to your message center. Select a message to read or start a new conversation.</p>
                    </div>
                    <div className="mt-5">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="border p-2 w-full"
                        />
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg relative w-full max-w-lg">
                        <button className="absolute top-2 right-2 text-xl">×</button>
                        <div className="text-lg font-bold mb-4">Nouveau message</div>
                        <div className="mb-4 flex items-center">
                            <span className="text-gray-700 text-sm font-semibold mr-2">À:</span>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Recherchez..."
                                className="flex-grow border-b-2 border-gray-300 focus:border-blue-500 outline-none"
                            />
                        </div>
                        {searchResults.length > 0 && (
                            <ul className="bg-white shadow rounded mt-2">
                                {searchResults.map((result, index) => (
                                    <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">{result}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MessageComponent;
