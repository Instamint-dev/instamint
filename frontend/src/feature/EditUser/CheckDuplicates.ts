import UserProfile from "../../type/feature/user/user_profil.ts"
import {checkLoginExists} from "./service/EditUserService.ts"

export const checkDuplicates = async (formDataD: UserProfile, userProfileData: UserProfile) => {
    const [existsLogin, existsMail] = await Promise.all([checkLoginExists(formDataD.username), checkLoginExists(formDataD.email)])

    return { existsLogin: existsLogin.exists && formDataD.username !== userProfileData.username, existsMail: existsMail.exists && formDataD.email !== userProfileData.email }
}