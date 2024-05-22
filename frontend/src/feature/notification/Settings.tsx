import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar"
import { getSettingNotification, updateSettingNotification } from "./service/NotificationService"
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
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target
        setNotificationSettings({ ...notificationSettings, [name]: checked })

        void handleSubmit()
    }
    const handleSubmit = async () => {
        updateSettingNotification(notificationSettings)
    }

    return (
        <>
            <Navbar />
            <h1>Settings</h1>
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="font-bold">Notification Type</div>
                <div className="font-bold">Enabled</div>

                {Object.keys(notificationSettings).map((key) => (
                    <div key={key}>
                        <div className="capitalize">{key}</div>
                        <div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name={key}
                                    checked={notificationSettings[key]}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Settings