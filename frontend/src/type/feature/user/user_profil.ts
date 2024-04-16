
interface UserProfile {
    username: string
    usernameOld?: string
    email: string
    image?: string ,
    bio?: string
    visibility: "public" | "private"
}

export default UserProfile