import { Buffer } from 'buffer';

interface UserProfile {
    username: string;
    email: string;
    profilePhoto?: string | Buffer| File;
    bio?: string;
    visibility: "public" | "private";
}

export default UserProfile;