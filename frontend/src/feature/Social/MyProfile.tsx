import {useEffect, useState} from "react"
import { getMyLink } from "./service/Social"
import User from "./User"
const MyProfile = () => {
    const [link, setLink] = useState("")
    useEffect(() => {
        try {
            const getLink = async () => {
                const responseLink = await getMyLink()                
                setLink(responseLink)
            }
            void getLink()
        }
        catch (error: unknown) {
            throw new Error(`Error when fetching link profile`)
        }
    }, [])
    if (link === "") {
        return <p>Loading...</p>
    }

    return (
        <>
            <User linkProfile={link}/>
        </>
    )
}

export default MyProfile