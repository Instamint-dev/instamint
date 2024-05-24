import Navbar from "../navbar/navbar.tsx";
import {useEffect, useState} from "react";
import RequestsReceived from "./RequestsComponent.tsx";
import {getRequestsChangeNfts, getRequestsChangeNftsSent} from "./service/MarcheService.ts";
import RequestsExchangeNFTResponse from "../../type/feature/marche/RequestsExchangeNFT.ts";
import UserProfile from "../../type/feature/user/user_profil.ts";
import {getDataProfil} from "../EditUser/service/EditUserService.ts";

const RequestForNFT = () => {
    const [tab, setTab] = useState("send")
    const [requestsChangeReceived, setRequestsChangeReceived] = useState<RequestsExchangeNFTResponse>()
    const [user, setUser] = useState<UserProfile>()

    const handleTabChange = (tabName:string) => {
        setTab(tabName)
    }

    useEffect(() => {
        const fetchRequests = async () => {
            setUser(await getDataProfil());
            if (tab === "send") {
                const response = await getRequestsChangeNftsSent()
                setRequestsChangeReceived(response)
            } else if (tab === "received") {
                const response = await getRequestsChangeNfts()
                setRequestsChangeReceived(response)
            }
        }
        fetchRequests()
            .then(r => r)
            .catch((e: unknown) => e)
    }, [tab])


    return (
        <><Navbar/>
            <div className="text-lg font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap justify-center -mb-px">
                    <li className="me-2">

                        <a
                            href="#"
                            onClick={() => {
                                handleTabChange("send")
                            }}
                            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                                tab === "send"
                                    ? "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    : ""
                            } ${
                                tab === "send"
                                    ? "text-gray-600 border-gray-300"
                                    : "text-gray-500 dark:text-gray-400 dark:border-gray-700"
                            }`}
                            style={{
                                borderBottomColor: tab === "send" ? "#1f2937" : "transparent",
                            }}
                        >
                           Requests sent
                        </a>

                    </li>
                        <li className="me-2">

                            <a
                                href="#"
                                onClick={() => {
                                    handleTabChange("received")
                                }}
                                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                                    tab === "received "
                                        ? "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                        : ""
                                } ${
                                    tab === "received "
                                        ? "text-gray-600 border-gray-300"
                                        : "text-gray-500 dark:text-gray-400 dark:border-gray-700"
                                }`}
                                style={{
                                    borderBottomColor: tab === "received" ? "#1f2937" : "transparent",
                                }}
                            >
                                Requests received
                            </a>
                        </li>

                       <RequestsReceived RequestsExchangeNFTResponse={requestsChangeReceived} user={user}/>

                </ul>

            </div>
        </>
    )
}

export default RequestForNFT