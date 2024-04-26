import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchNFt } from "./service/NFTService.ts"
import ResponseSingleNFt from "../../../type/feature/nft/ResponseSingleNFt.ts"

function NftDetail() {
    const { imageName, link } = useParams();
    const [success, setSuccess] = useState<boolean>(true);
    const [infoNft, setInfoNft] = useState<ResponseSingleNFt>();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const nft: ResponseSingleNFt = await searchNFt(link || "");
                setInfoNft(nft);
            } catch (err: unknown) {
                setSuccess(false);
            }
        };
        fetchUserProfile().then(r => r).catch((e: unknown) => e);
    }, [link]);

    if (!success) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h2 className="text-2xl font-bold">Chargement...</h2>
                <img
                    className="w-20 h-20 animate-spin"
                    src="https://instamintkami.blob.core.windows.net/instamint/UUq.gif"
                    alt="Loading GIF"
                />
            </div>
        );
    }

    console.log(infoNft)

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-4xl font-bold mb-4">Détails du NFT {imageName}</h2>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <p className="text-lg">Description: {infoNft?.nft?.description}</p>
                <p className="text-lg">Nombre de "likes": {infoNft?.nft?.mint}</p>
                <div className="mt-3">
                    <img
                        className="w-1/2 h-auto mx-auto rounded-lg"
                        src={infoNft?.nft?.image}
                        alt={`NFT ${imageName}`}
                    />
                </div>
                <a
                    href={infoNft?.nft?.link}
                    className="text-blue-500 hover:underline mt-2"
                >
                </a>
            </div>
        </div>
    );
}

export default NftDetail;
