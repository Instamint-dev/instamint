import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar"
import {deleteNotification, getNotifications} from "./service/NotificationService"
import NotificationResponse from "../../type/request/notification_response"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import CustomInput from "../../components/CustomButton"
import {followUser, followUserTeaBag} from "../Social/service/Social"

const Notification = () => {
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState<NotificationResponse[]>([])
    const [action, setAction] = useState<number>(0)
    const handleClick = (link: string, type: number) => {
        if (type === 1 || type === 2 || type === 3 || type === 0|| type === 7) {
            navigate(`/user/${link}`, { replace: true })

            return
        }else if (type === 4|| type === 5 || type === 6) {
            navigate(`/nft/searchNFT/${link}`, { replace: true })

            return
        }
        else if (type >= 9 && type <= 16) {
            navigate(`/nft/requestsNFT/`, { replace: true })

            return
        }

        navigate(link)
    }
    const acceptFollow = async (link: string) => {
        try {
            const ACCEPT_FOLLOW = await followUser(link, 7)
            if (ACCEPT_FOLLOW.return === 6) {
                const list: NotificationResponse[] = await getNotifications()
                const notificationsList = list.map((item) => ({
                    id: item.id,
                    message: item.message,
                    type: item.type,
                    link: item.link,
                    CREATED_AT: item.CREATED_AT,
                    ID_TYPE: item.ID_TYPE,
                    USER_ID: item.USER_ID,
                    USERNAME: item.USERNAME
                }))
                setNotifications(notificationsList)
            }
        } catch (err) {
            throw new Error("Error getting notifications")
        }
    }
const acceptJoinTeaBag = async (link: string,id:number) => {
        try {
            const ACCEPT_JOIN = await followUserTeaBag(link, 11,id)

            if (ACCEPT_JOIN.return === 10) {
                const list: NotificationResponse[] = await getNotifications()
                const notificationsList = list.map((item) => ({
                    id: item.id,
                    message: item.message,
                    type: item.type,
                    link: item.link,
                    CREATED_AT: item.CREATED_AT,
                    ID_TYPE: item.ID_TYPE,
                    USER_ID: item.USER_ID,
                    USERNAME: item.USERNAME
                }))
                setNotifications(notificationsList)
            }
        } catch (err) {
            throw new Error("Error getting notifications")
        }
    }
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const list: NotificationResponse[] = await getNotifications()
                const notificationsList = list.filter(item => item.id !== 0).map((item) => ({
                    id: item.id,
                    message: item.message,
                    type: item.type,
                    link: item.link,
                    CREATED_AT: item.CREATED_AT,
                    ID_TYPE: item.ID_TYPE,
                    USER_ID: item.USER_ID,
                    USERNAME: item.USERNAME
                }))
                setNotifications(notificationsList)
            } catch (err) {
                throw new Error("Error getting notifications")
            }
        }
        void fetchNotifications()        
    }, [action])

    const handleDelete=async (id: number) => {
        const response=await deleteNotification(id)
        if (response) {
            setAction((prev) => prev + 1)
        }
    }

    return (
        <>
            <Navbar />
            <div className="p-4">
                <h1 className="text-lg font-bold mb-4 md:text-2xl">Notifications</h1>
                <ul>
                    {notifications.map(notification => (
                        <li key={`key-${notification.id.toString()}`} className="flex relative justify-between items-center bg-white shadow-md rounded-lg p-4 z-0 mb-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                            <div className="flex-grow">
                                <h2 onClick={() => {handleClick(notification.link, notification.ID_TYPE)}} className="font-semibold cursor-pointer text-sm md:text-base hover:text-blue-500">{notification.type} {notification.ID_TYPE === 0 && <span className="text-green-500">Accepted</span>}</h2>
                                <div className="flex justify-between">
                                    <div className="z-50 relative">
                                        <p className="text-xs text-gray-500 md:text-sm">{notification.message} | {notification.USERNAME}</p>
                                        {(notification.ID_TYPE === 1) ? <CustomInput type="button" value="Accept" onClick={() => acceptFollow(notification.link)} /> : <></>}
                                        {(notification.ID_TYPE === 7) ? <CustomInput type="button" value="Accept" onClick={() => acceptJoinTeaBag(notification.link,notification.id)} /> : <></>}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 md:text-sm">{format(new Date(notification.CREATED_AT), "yyyy-MM-dd HH:mm:ss")}</p>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(notification.id)} className="text-red-500 hover:text-red-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
export default Notification