import {useState} from "react"
import SubComponentFeedNFT from "./SubComponentFeedNFT.tsx"
import Navbar from "../../navbar/navbar.tsx"
import {useAuth} from "../../../providers/AuthProvider.tsx"
import {useTranslation} from "react-i18next"

const FeedNFT = () => {
    const [tab, setTab] = useState("ForYou")
    const handleTabChange = (tabName:string) => {
        setTab(tabName)
    }
    const {isAuthenticated} = useAuth()
    const {t} = useTranslation()

    return (
       <><Navbar/>
           <div className="text-lg font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
               <ul className="flex flex-wrap justify-center -mb-px">
                   <li className="me-2">

                       <a
                           href="#"
                           onClick={() => {
                               handleTabChange("ForYou")
                           }}
                           className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                               tab === "ForYou"
                                   ? "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                   : ""
                           } ${
                               tab === "ForYou"
                                   ? "text-gray-600 border-gray-300"
                                   : "text-gray-500 dark:text-gray-400 dark:border-gray-700"
                           }`}
                           style={{
                               borderBottomColor: tab === "ForYou" ? "#1f2937" : "transparent",
                           }}
                       >
                           {t("For you")}
                       </a>

                   </li>
                   {isAuthenticated && (
                   <li className="me-2">

                           <a
                               href="#"
                               onClick={() => {
                                   handleTabChange("follow")
                               }}
                               className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                                   tab === "nft"
                                       ? "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                       : ""
                               } ${
                                   tab === "nft"
                                       ? "text-gray-600 border-gray-300"
                                       : "text-gray-500 dark:text-gray-400 dark:border-gray-700"
                               }`}
                               style={{
                                   borderBottomColor: tab === "follow" ? "#1f2937" : "transparent",
                               }}
                           >
                               {t("Followers")}
                           </a>
                   </li>
                       )}


               </ul>

               <SubComponentFeedNFT tab={tab}/>
           </div>

       </>
    )
}

export default FeedNFT