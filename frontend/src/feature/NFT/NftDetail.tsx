import { useParams } from 'react-router-dom';
import {useEffect, useState,} from "react";
import {searchNFt} from "./service/NFTService.ts";
import ResponseSingleNFt from "./ResponseSingleNFt.ts";

function NftDetail() {
    const { imageName } = useParams();
    const [success, setSuccess] = useState<boolean>(true)
    const { link } = useParams()




    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
               const nft:ResponseSingleNFt= await searchNFt(link || "")
                console.log(nft.nft)


            } catch (err: unknown) {
                setSuccess(false)
            }
        }
        fetchUserProfile().then(r => r).catch((e: unknown) => e)
    }, [])



    if (!success) {
        return (
            <div>
                <h2>Loading...</h2>
                <img src="https://instamintkami.blob.core.windows.net/instamint/UUq.gif" alt="Loading GIF" />
            </div>
        );
    }

    return (
        <div>
            <h2>Details du NFT</h2>
            <p>Nom de l'image: {imageName}</p>
        </div>
    );
}

export default NftDetail;
