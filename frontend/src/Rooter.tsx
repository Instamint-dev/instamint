import GeneratePassword from "./feature/mailToken/forgotPassword/GeneratePassword.tsx"
import RegisterToken from "./feature/mailToken/registerToken/registerToken.tsx"
import ForgotPassword from "./feature/mailToken/forgotPassword/ForgotPassword.tsx"
import EditUser from "./feature/EditUser/EditUser.tsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterPage from "./feature/register/Register.tsx"
import HomePage from "./feature/Home.tsx"
import ConnectionPage from "./feature/connection/Connection.tsx"
import { useAuth } from "./providers/AuthProvider.tsx"
import PageNotFound from "./feature/PageNotFound.tsx"
import NFTPage from "./feature/NFT/DraftNFT/NFTPage.tsx"
import FormDraft from "./feature/NFT/DraftNFT/FormDraft.tsx"
import NftDetail from "./feature/NFT/PostNFT/NftDetail.tsx"

import DoubleAuth from "./feature/doubleAuth/doubleAuth.tsx"
import CheckDoubleAuthLogin from "./feature/doubleAuth/checkDoubleAuthLogin.tsx"
import ChooseNFTPost from "./feature/NFT/PostNFT/ChooseNFTPost.tsx"
import ConfirmPost from "./feature/NFT/PostNFT/ConfirmPost.tsx"
import User from "./feature/Social/User.tsx"
import Notification from "./feature/notification/Notification.tsx"
const Rooter = () => {
    const { isAuthenticated } = useAuth()
    
    return (
        <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/nft/searchNFT/:link" element={<NftDetail/>} />
            <Route path="/user/:link" element={<User/>} />
            {isAuthenticated  ? 
            <>
                <Route path="/editUser" element={<EditUser />} />
                <Route path="/nft" element={<NFTPage />} />
                <Route path="/nft/createDraft" element={<FormDraft />} />
                <Route path="/doubleFA" element={<DoubleAuth />} />
                <Route path="/postNFT" element={<ChooseNFTPost/>} />
                <Route path="/postNFT/confirmPost" element={<ConfirmPost/>} />
                <Route path="/notifications" element={<Notification/>}/>
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
    </Router>

    )
}

export default Rooter