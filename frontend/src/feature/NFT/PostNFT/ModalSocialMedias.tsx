import {
    EmailIcon, EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton, WhatsappIcon, WhatsappShareButton
} from "react-share"
import ModalSocialMediasProps from "../../../type/feature/nft/modal_social_medias_props.ts"
const ModalSocialMedias = ({ linkNft, link, handleModalClose }:ModalSocialMediasProps) =>(

        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-md">
                <div className="flex items-center mb-4">
                    <div className="mr-2">
                        <FacebookIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <FacebookShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        Facebook
                    </FacebookShareButton>
                </div>
                <div className="flex items-center mb-4">
                    <div className="mr-2">
                        <TwitterIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <TwitterShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        Twitter
                    </TwitterShareButton>
                </div>
                <div className="flex items-center mb-4">
                    <div className="mr-2">
                        <LinkedinIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <LinkedinShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        LinkedIn
                    </LinkedinShareButton>
                </div>
                <div className="flex items-center mb-4">
                    <div className="mr-2">
                        <EmailIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <EmailShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        Email
                    </EmailShareButton>
                </div>
                <div className="flex items-center mb-4">
                    <div className="mr-2">
                        <WhatsappIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <WhatsappShareButton url={link + linkNft} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        WhatsApp
                    </WhatsappShareButton>
                </div>
                <button onClick={handleModalClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Close
                </button>
            </div>
        </div>
    )

export default ModalSocialMedias