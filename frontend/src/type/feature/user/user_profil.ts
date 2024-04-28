
interface UserProfile {
    username: string
    usernameOld?: string
    email: string
    image?: string ,
    bio?: string
    visibility: "public" | "private"
    link: string
}

export default UserProfile