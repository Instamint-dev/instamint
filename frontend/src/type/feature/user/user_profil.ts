import BUFFERIMAGE from "./buffer_image.ts"

interface UserProfile {
    username: string
    email: string
    image?: {type:string,data:number[]} |string | BUFFERIMAGE,
    bio?: string
    visibility: "public" | "private"
}

export default UserProfile