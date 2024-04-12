import UPDATE_PROFILE_RESPONSE from "../../../type/request/updateprofile_response.ts";
import axios from "axios";
import AXIOS_ERROR from "../../../type/request/axios_error.ts";
import USER_PROFIL from "../../../type/feature/user/user_profil.ts";
import imageCompression from 'browser-image-compression'; // Importez la bibliothèque de compression d'image

const API_URL = "http://localhost:3333"
const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
}

// Fonction pour convertir une chaîne de données base64 en un objet blob
function dataURItoBlob(dataURI: string) {
    // Divisez la chaîne de données base64 en ses parties composantes
    const byteString = atob(dataURI.split(',')[1]);
    // Créez un tableau qui correspond à la longueur de la chaîne de caractères
    const ab = new ArrayBuffer(byteString.length);
    // Créez un tableau d'octets non signés de 8 bits
    const ia = new Uint8Array(ab);
    // Bouclez sur chaque caractère de la chaîne et convertissez-le en code ASCII
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

export const updateProfile = async (userData: USER_PROFIL): Promise<UPDATE_PROFILE_RESPONSE> => {
    try {

        let updatedUserData = { ...userData };

        if (typeof userData.profilePhoto === "string") {
            // Convertissez la chaîne base64 en blob
            const blobImage = dataURItoBlob(userData.profilePhoto);

            // Compression de l'image blob
            const compressedBlob = await imageCompression(blobImage as File, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
            });

            const compressedFile = new File([compressedBlob], "compressed_image.jpg", { type: 'image/jpeg' });

            updatedUserData = { ...userData, profilePhoto: compressedFile };

        }
            console.log(updatedUserData);

        const response = await axios.post<UPDATE_PROFILE_RESPONSE>(`${API_URL}/updateProfil`, updatedUserData, config);
        return response.data;
    } catch (err: unknown) {
        if ((err as AXIOS_ERROR).message) {
            throw new Error((err as AXIOS_ERROR).message || "Error editing user profile");
        } else {
            throw new Error("Error editing user profile");
        }
    }
}
