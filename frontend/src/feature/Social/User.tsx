import { useParams } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { useEffect, useState } from "react"
import { getUser } from "./service/Social.ts"
import AXIOS_ERROR from "../../type/request/axios_error.ts"
import USER_TYPE from "../../type/request/User.ts"
const User = () => {
    const { link } = useParams()
    const [error, setError] = useState(false)
    useEffect(() => {
        try {
            const getUserInfo = async () =>{
                const infos: USER_TYPE = await getUser(link || "")
                console.log(infos);
                console.log(infos.message);
                 
                setError(infos.message)
                console.log(error)
            }
            getUserInfo().then(r => r).catch((e: unknown) => e)

        } catch (err: unknown) {
            if ((err as AXIOS_ERROR).message) {
                setError(false)
            }
        }
    } , [])
    return (
        <>
            <Navbar />
            <div className="flex items-center flex-col">
                {error ?
                    <h1>wait</h1>
                    :
                    <h1>Your user does not exit</h1>
                }
                
            </div>
        </>
    )
}

export default User