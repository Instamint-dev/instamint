import GeneratePassword from "./feature/mailToken/forgotPassword/GeneratePassword.tsx"
import RegisterToken from "./feature/mailToken/registerToken/registerToken.tsx"
import ForgotPassword from "./feature/mailToken/forgotPassword/ForgotPassword.tsx"
import EditUser from "./feature/EditUser/EditUser.tsx"
import { Routes, Route } from "react-router-dom"
import RegisterPage from "./feature/register/Register.tsx"
import HomePage from "./feature/Home.tsx"
import ConnectionPage from "./feature/connection/Connection.tsx"
import { useAuth } from "./providers/AuthProvider.tsx"
import PageNotFound from "./feature/PageNotFound.tsx"
import NFTPage from "./feature/NFT/DraftNFT/NFTPage.tsx"
import FormDraft from "./feature/NFT/DraftNFT/FormDraft.tsx"
import NftDetail from "./feature/NFT/PostNFT/NftDetail.tsx"
import Search from "./feature/search/Search.tsx"
import DoubleAuth from "./feature/doubleAuth/doubleAuth.tsx"
import CheckDoubleAuthLogin from "./feature/doubleAuth/checkDoubleAuthLogin.tsx"
import ChooseNFTPost from "./feature/NFT/PostNFT/ChooseNFTPost.tsx"
import ConfirmPost from "./feature/NFT/PostNFT/ConfirmPost.tsx"
import MessageComponent from "./feature/PrivateMessaging/MessageComponent.tsx"
import User from "./feature/Social/User.tsx"
import Notification from "./feature/notification/Notification.tsx"
import TeaBag from "./feature/TeaBag/TeaBag.tsx"
import CreateTeaBag from "./feature/TeaBag/CreateTeaBag.tsx"
import Settings from "./feature/notification/Settings.tsx"
import MyProfile from "./feature/Social/MyProfile.tsx"
const Rooter = () => {
    const { isAuthenticated } = useAuth()

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/nft/searchNFT/:link" element={<NftDetail/>} />
            <Route path="/user/:link" element={<User/>} />
            <Route path="/search" element={<Search/>} />

            {isAuthenticated  ? 
            <>
                <Route path="/editUser" element={<EditUser />} />
                <Route path="/nft" element={<NFTPage />} />
                <Route path="/nft/createDraft" element={<FormDraft />} />
                <Route path="/doubleFA" element={<DoubleAuth />} />
                <Route path="/postNFT" element={<ChooseNFTPost/>} />
                <Route path="/postNFT/confirmPost" element={<ConfirmPost/>} />
                <Route path="/messages" element={<MessageComponent />} />
                <Route path="/notifications-settings" element={<Settings/>}/>
                <Route path="/notifications" element={<Notification/>}/>
                <Route path="/teaBag" element={<TeaBag />} />
                <Route path="/teaBag/createTeaBag" element={<CreateTeaBag/>}/>
                <Route path="/teaBag/editTeaBag/" element={<CreateTeaBag/>}/>
                <Route path="/me" element={<MyProfile/>}/>
            </>
            :
            <>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/generate-password/:id" element={<GeneratePassword />} />
                <Route path="/register_token/:id" element={<RegisterToken />} />
                <Route path="/double-auth" element={<CheckDoubleAuthLogin/>}/>
                <Route path="/connection" element={<ConnectionPage />} />
            </>
            }
        </Routes>

    )
}

export default Rooter