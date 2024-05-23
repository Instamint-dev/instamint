import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar"
import Sidebar from "../navbar/sidebar"
import { getSettingNotification, updateSettingNotification } from "./service/NotificationService"
import NotificationSetting from "../../type/request/notification_setting"
import notification_setting_key from "../../type/feature/notification/notification_settings_key"
const Settings = () => {
    const [notificationSettings, setNotificationSettings] = useState<NotificationSetting>({
        commentaryAnswer: false,
        commentaryThread: false,
        mint: false,
        follow: false,
        followRequest: false
    })
    const [check, setCheck] = useState<boolean>(false)
    useEffect(() => {
        const fetchNotificationSettings = async () => {
            try {
                const response: NotificationSetting = await getSettingNotification()
                setNotificationSettings(response)
                setCheck(true)
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
    }
    useEffect(() => {
        const handleSubmit = async () => {
            try {
                if (check) {
                    await updateSettingNotification(notificationSettings)
                }
            } catch (error: unknown) {
                console.error(`Error when updating notification settings: ${error}`)
            }
        }

        void handleSubmit()
    }, [notificationSettings])

    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="flex justify-center">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <div className="grid grid-cols-2 gap-4 p-4">
                        <div>
                            {Object.keys(notificationSettings).map((key) => (
                                <div key={key} className="mb-4">
                                    <div className="capitalize">{key}</div>
                                </div>
                            ))}
                        </div>
                        <div>
                            {Object.keys(notificationSettings).map((key) => (
                                <div key={key} className="mb-3">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name={key}
                                            checked={notificationSettings[key as notification_setting_key]}
                                            onChange={handleChange}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings