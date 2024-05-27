import React from "react"
import UserProfile from "../../type/feature/user/user_profil.ts"
import { useTranslation } from "react-i18next"
interface Props {
    toggleModal: () => void
    searchUser: string
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
    userFollow: UserProfile[]
    setSearchUser: (search: string) => void
    createDiscussion: (otherId: number) => void
}

const ModalSearchUser: React.FC<Props> = ({ toggleModal, searchUser, handleSearch, userFollow, createDiscussion }) => {
    const { t } = useTranslation()
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={toggleModal}></div>
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-xl mx-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">{t("New message")}</h2>
                    <button onClick={toggleModal} className="text-gray-600 hover:text-gray-900">&times;</button>
                </div>
                <div className="p-4">
                    <input
                        type="text"
                        placeholder="Recherchez..."
                        value={searchUser}
                        onChange={handleSearch}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-7"
                    />

                    <ul className="mt-2 max-h-40 overflow-y-auto">
                        {userFollow.length ? (
                            userFollow.map(result => (
                                <li key={result.id} className="flex items-center p-2 border-b border-gray-200 cursor-pointer" onClick={() => { createDiscussion(result.id) }}>
                                    <img src={result.image} alt={result.username} className="w-8 h-8 rounded-full mr-2" />
                                    <span>{result.username}</span>
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">{t("No accounts found")}</li>
                        )}
                    </ul>
                </div>
                <div className="p-4 border-t">
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out">{t("Discuss")}</button>
                </div>
            </div>
        </div>
    )
}
export default ModalSearchUser