import Draft from "../feature/nft/Draft"
import UserInfo from "../feature/social/UserInfo"
interface User {
    return: boolean,
    user : {
        followers: number,
        following: number,
        nfts: Draft[],
        status: string,
        infosUser: UserInfo
    },
}
export default User