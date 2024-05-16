
interface UserProfile {
    id: number
    username: string
    usernameOld?: string
    email: string
    image?: string ,
    bio?: string
    visibility: "public" | "private"
    link: string
    SEARCH_STATUS: boolean
    phone : string
}

export default UserProfile