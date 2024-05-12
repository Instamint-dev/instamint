import {Link} from "react-router-dom"
import {useEffect, useState} from "react"
import TeaBagType from "../../type/feature/teabag/teabag_profil.ts"
import {deleteUser, getMyTeaBag} from "./service/TeaBagService.ts"

const MyTeaBag = () => {
    const [teaBags, setTeaBags] = useState<TeaBagType[]>([])
    const [action, setAction] = useState<number>(0)

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
    }, [action])

const deleteTeaBag = async (id: number) => {
    try {
        const result = await deleteUser(id)
        if (result) {
            setAction(action + 1)
        }
    } catch (err) {
        throw new Error("Error deleting draft")
    }
}

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

                    <button onClick={() => { void deleteTeaBag(teaBag.id)}} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded ml-4">
                        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>

                </div>
            ))}


        </div>
    )
}

export default MyTeaBag