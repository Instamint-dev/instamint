import BUFFER_IMAGE from "../../type/feature/user/buffer_image.ts";

export const binaryToBase64 = async (buffer: BUFFER_IMAGE|string): Promise<string> => {
    if(typeof buffer === "string") {
        const buff: BUFFER_IMAGE = {
            data:buffer.split(',').map((byte: string) => parseInt(byte, 10)),
            type:"BUFFER_IMAGE",
        }
        const binaryString = buff.data.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
        return btoa(binaryString);
    }else{
        const binaryString = buffer.data.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), '');
        return btoa(binaryString);
    }

}