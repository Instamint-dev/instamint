import {Link} from "react-router-dom"
import TeaBagType from "../../type/feature/teabag/teabag_profil.ts"
import {useEffect, useState} from "react"
import {getTeaBag} from "./service/TeaBagService.ts"


const ListTeaBag = () => {
    const [teaBags, setTeaBags] = useState<TeaBagType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTeaBag()
                setTeaBags(result)
            } catch (err) {
                throw new Error("Error getting drafts")
            }
        }
        fetchData().then(r => r).catch((e: unknown) => e)
    }, [])

    return (
        <div className="my-10">
            {teaBags.map(teaBag => (
                <div key={teaBag.id} className="flex items-center justify-center my-5">
                    <Link to={`/user/${teaBag.link}`} className="flex items-center">
                        <img src={teaBag.image} alt="Photo de profil" className="w-12 h-12 rounded-full mr-4" />
                        <h1 className="text-xl font-semibold">{teaBag.username}</h1>
                    </Link>
                </div>
            ))}

            <div className="fixed bottom-4 right-4">
                <Link to="/teaBag/createTeaBag">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center z-10" style={{ backgroundColor: "#1E90FF" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m-4-8h8" />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ListTeaBag