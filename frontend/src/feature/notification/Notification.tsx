import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar"
import { getNotifications } from "./service/NotificationService"
import NotificationResponse from "../../type/request/notification_response"
import { useNavigate } from "react-router-dom"
const Notification = () => {
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState<NotificationResponse[]>([])
    const handleClick = (link: string) => {
        navigate(link)
    }
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const list: NotificationResponse[] = await getNotifications()
                const notificationsList = list.map((item) => ({
                    id: item.id,
                    message: item.message,
                    type: item.type,
                    link: item.link,
                    created_at: item.created_at
                }))
                setNotifications(notificationsList)

            } catch (err) {
                throw new Error("Error getting notifications")
            }
        }
        fetchNotifications()
    }, [])

    return (
        <>
            <Navbar />
            <div className="p-4">
                <h1 className="text-lg font-bold mb-4 md:text-2xl">Notifications</h1>
                <ul>
                    {notifications.map(notification => (
                        <li onClick={() => handleClick(notification.link)} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                            <div className="flex-grow">
                                <h2 className="font-semibold text-sm md:text-base hover:text-blue-500">{notification.type}</h2>
                                <div className="flex justify-between">
                                    <p className="text-xs text-gray-500 md:text-sm">{notification.message}</p>
                                    <p className="text-xs text-gray-500 md:text-sm">{notification.created_at}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}

export default Notification