import buffer_image from "./buffer_image.ts";

interface UserProfile {
    username: string
    email: string
    image?: {type:string,data:number[]} |string  | buffer_image,
    bio?: string
    visibility: "public" | "private"
}

export default UserProfile