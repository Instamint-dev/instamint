
interface UserProfile {
    id: number
    username: string
    usernameOld?: string
    email: string
    image?: string ,
    bio?: string
    visibility: "public" | "private"
    link: string
    search_status: boolean
}

export default UserProfile