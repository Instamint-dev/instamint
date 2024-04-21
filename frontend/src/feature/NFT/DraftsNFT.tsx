import { Link } from 'react-router-dom'
import {getDrafts} from "./service/NFTService.ts";

const onclick = () => {
    const a=getDrafts()
    console.log(a)

}

const DraftsNFT = () => {
    return (
        <div className="fixed bottom-4 right-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full" onClick={onclick}>Create Draft</button>
            <Link to="/nft/createDraft">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center" style={{ backgroundColor: "green" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m-4-8h8"/>
                    </svg>
                </button>
            </Link>
        </div>
    )
}

export default DraftsNFT
