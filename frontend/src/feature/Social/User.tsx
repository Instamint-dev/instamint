import { useParams } from "react-router-dom"
import Navbar from "../navbar/navbar"
import { useEffect } from "react"
const User = () => {
    const { link } = useParams()
    useEffect(() => {
        console.log(link)
    })
    return (
        <>
            <Navbar />
            <div className="flex items-center flex-col">
                <h1>prout</h1>
                <h2>{link}</h2>
            </div>
        </>
    )
}

export default User