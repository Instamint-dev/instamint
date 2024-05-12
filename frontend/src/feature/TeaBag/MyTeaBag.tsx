import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import TeaBagType from "../../type/feature/teabag/teabag_profil.ts";
import {getMyTeaBag} from "./service/TeaBagService.ts";

const MyTeaBag = () => {
    const [teaBags, setTeaBags] = useState<TeaBagType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMyTeaBag()
                setTeaBags(result)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, []);

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

        </div>
    );
}

export default MyTeaBag;