import Navbar from "../navbar/navbar.tsx";
    import {useState} from "react";
import ListTeaBag from "./ListTeaBag.tsx";
import MyTeaBag from "./MyTeaBag.tsx";

const TeaBag = () => {
    const [tab, setTab] = useState("AllteaBag")
    const handleTabChange = (tabName:string) => {
        setTab(tabName)
    }
    return (
        <>
            <Navbar />

            <div className="text-lg font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap justify-center -mb-px">
                    <li className="me-2">
                        <a
                            href="#"
                            onClick={() => {
                                handleTabChange("myTeaBag")
                            }}
                            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                                tab === "myTeaBag"
                                    ? "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    : ""
                            } ${
                                tab === "myTeaBag"
                                    ? "text-gray-600 border-gray-300"
                                    : "text-gray-500 dark:text-gray-400 dark:border-gray-700"
                            }`}
                            style={{
                                borderBottomColor: tab === "myTeaBag" ? "#1f2937" : "transparent",
                            }}
                        >
                            My Tea Bag
                        </a>
                    </li>

                    <li className="me-2">
                        <a
                            href="#"
                            onClick={() => {
                                handleTabChange("AllteaBag")
                            }}
                            className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                                tab === "AllteaBag"
                                    ? "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                    : ""
                            } ${
                                tab === "AllteaBag"
                                    ? "text-gray-600 border-gray-300"
                                    : "text-gray-500 dark:text-gray-400 dark:border-gray-700"
                            }`}
                            style={{
                                borderBottomColor: tab === "AllteaBag" ? "#1f2937" : "transparent",
                            }}
                        >
                            All Tea Bag
                        </a>
                    </li>

                </ul>

                {tab === "myTeaBag" && (
                   <MyTeaBag/>
                )}
                {tab === "AllteaBag" && (
                   <ListTeaBag/>
                )}
            </div>
        </>

    )
}


export default TeaBag;