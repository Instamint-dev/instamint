import { useState } from "react"
import { useParams } from "react-router-dom"

const User = () => {
    const [error, setError] = useState<boolean>(false)
    const { link } = useParams()
    setError(true)
    return (
        <div className="flex items-center flex-col">
            <h1>prout</h1>
            <h2>{String(link)}</h2>
            {error && <p>Error fetching user</p>}
        </div>
    )
}

export default User