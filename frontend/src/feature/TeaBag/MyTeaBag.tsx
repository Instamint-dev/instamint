import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import TeaBagType from "../../type/feature/teabag/teabag_profil.ts"
import {getMyTeaBag} from "./service/TeaBagService.ts"

const MyTeaBag = () => {
    const [teaBags, setTeaBags] = useState<TeaBagType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMyTeaBag()
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
                <div key={teaBag.id} className="flex items-center justify-center my-3">
                    <div className="flex items-center">
                            <img src={teaBag.image} alt="Photo de profil" className="w-12 h-12 rounded-full mr-4" />
                            <h1 className="text-xl font-semibold">{teaBag.username}</h1>
                    </div>
                    <Link to={`/teaBag/editTeaBag`} state={{ link: teaBag.link }} className="flex items-center">

                        <button className="bg-green-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded ml-4">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </button>
                </Link>

                </div>
            ))}


        </div>
    )
}

export default MyTeaBag