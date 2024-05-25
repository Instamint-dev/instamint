import Navbar from "../navbar/navbar.tsx"
import {useEffect, useState} from "react"
import RequestsComponent from "./RequestsExchangeComponent.tsx"
import {
    getRequestsChangeNftsReceived,
    getRequestsChangeNftsSent,
    getRequestsPurchaseNftsReceived, getRequestsPurchaseNftsSent
} from "./service/MarcheService.ts"
import RequestsExchangeNFTResponse from "../../type/feature/marche/RequestsExchangeNFT.ts"
import UserProfile from "../../type/feature/user/user_profil.ts"
import {getDataProfil} from "../EditUser/service/EditUserService.ts"
import RequestsPurchaseNFTResponse from "../../type/feature/marche/RequestsPurchaseNFT.ts"
import RequestPurchaseComponent from "./RequestPurchaseComponent.tsx"
import Sidebar from "../navbar/sidebar.tsx"



const RequestForNFT = () => {
    const [tab, setTab] = useState("send")
    const [requestsChange, setRequestsChange] = useState<RequestsExchangeNFTResponse>()
    const [user, setUser] = useState<UserProfile>()
    const [requestsPurchase, setRequestsPurchaseReceived] = useState<RequestsPurchaseNFTResponse>()
    const [action, setAction] = useState<number>(0)
    const handleTabChange = (tabName:string) => {
        setTab(tabName)
    }

    useEffect(() => {
        const fetchRequests = async () => {
            setUser(await getDataProfil())
            if (tab === "send") {
                const response = await getRequestsChangeNftsSent()
                setRequestsPurchaseReceived(await getRequestsPurchaseNftsSent())
                setRequestsChange(response)
            } else if (tab === "received") {
                const response = await getRequestsChangeNftsReceived()
                setRequestsPurchaseReceived(await getRequestsPurchaseNftsReceived())
                setRequestsChange(response)
            }
        }
        fetchRequests()
            .then(r => r)
            .catch((e: unknown) => e)
    }, [tab, action])


    return (
        <>
            <Navbar />
            <Sidebar/>
            <div className="flex flex-col items-center w-full">
                <div className="text-lg font-medium text-gray-500">
                    <ul className="flex justify-center space-x-4 my-4">
                        <li>
                            <a
                                href="#"
                                onClick={() =>{handleTabChange("send")}}
                                className={`px-4 py-2 rounded-lg ${
                                    tab === "send" ? "bg-gray-300" : "hover:bg-gray-200"
                                }`}
                            >
                                Requests sent
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => {handleTabChange("received")}}
                                className={`px-4 py-2 rounded-lg ${
                                    tab === "received" ? "bg-gray-300" : "hover:bg-gray-200"
                                }`}
                            >
                                Requests received
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-between w-full px-10">
                    <div className="w-1/2">
                        <RequestsComponent requestExchangeNFT={requestsChange} user={user} setAction={setAction}/>
                    </div>
                    <div className="w-1/2">
                        <RequestPurchaseComponent requestPurchaseNFT={requestsPurchase} user={user} setAction={setAction}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RequestForNFT