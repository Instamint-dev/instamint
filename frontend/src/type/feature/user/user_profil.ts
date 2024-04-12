
interface UserProfile {
    username: string
    email: string
    profilePhoto?: string | File
    bio?: string
    visibility: "public" | "private"
}

export default UserProfile