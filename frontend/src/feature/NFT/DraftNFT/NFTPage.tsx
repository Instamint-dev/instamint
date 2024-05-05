import Navbar from "../../navbar/navbar.tsx"
import {useState} from "react"
import NFTPost from "../PostNFT/NFTPost.tsx"
import DraftsNFT from "./DraftsNFT.tsx"
import Sidebar from "../../navbar/sidebar.tsx"

const NFTPage = () => {
    const [tab, setTab] = useState("nft")
    const handleTabChange = (tabName:string) => {
        setTab(tabName)
    }

    return (
      <>
      <Navbar /><Sidebar/>

          <div className="text-lg font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap justify-center -mb-px">
                  <li className="me-2">
                      <a
                          href="#"
                          onClick={() => {
                              handleTabChange("nft")
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
                              borderBottomColor: tab === "nft" ? "#1f2937" : "transparent",
                          }}
                      >
                          NFT
                      </a>
                  </li>

                  <li className="me-2">
                      <a
                          href="#"
                          onClick={() => {
                              handleTabChange("drafts")
                          }}
                          className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                              tab === "drafts"
                                  ? "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                  : ""
                          } ${
                              tab === "drafts"
                                  ? "text-gray-600 border-gray-300"
                                  : "text-gray-500 dark:text-gray-400 dark:border-gray-700"
                          }`}
                          style={{
                              borderBottomColor: tab === "drafts" ? "#1f2937" : "transparent",
                          }}
                      >
                          Drafts
                      </a>
                  </li>

              </ul>

              {tab === "nft" && (
                  <NFTPost/>
              )}
              {tab === "drafts" && (
                 <DraftsNFT/>
              )}
          </div>
      </>

  )
}

export default NFTPage