import {useEffect, useState} from "react"
import Navbar from "../navbar/navbar"
import { getSettingNotification } from "./service/NotificationService"
import NotificationSetting from "../../type/request/notification_setting"

const Settings = () => {
    const [notificationSettings, setNotificationSettings] = useState<NotificationSetting>({
        commentaryAnswer: false,
        commentaryThread: false,
        mint: false,
        follow: false,
        followRequest: false
    })
    useEffect(() => {
        const fetchNotificationSettings = async () => {
            try {
                const response: NotificationSetting = await getSettingNotification()
                setNotificationSettings(response)
            } catch (error: unknown) {
                throw new Error(`Error when fetching notification settings`)
            }
        }
        void fetchNotificationSettings()
    }
    , [])

    return (
        <>
            <Navbar/>
            <h1>Settings</h1>
            <div>
                
            </div>
        </>
    )
}

export default Settings