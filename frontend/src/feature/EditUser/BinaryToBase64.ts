import BUFFER_IMAGE from "../../type/feature/user/buffer_image.ts"

export const binaryToBase64 = (buffer: BUFFER_IMAGE | string): string => {
    let binaryString = ""

    if (typeof buffer === "string") {
        const buff: BUFFER_IMAGE = {
            data: buffer.split("").map((byte: string) => parseInt(byte, 10)),
            type: "BUFFER_IMAGE",
        }
        binaryString = buff.data.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), "")
    } else {
        binaryString = buffer.data.reduce((acc: string, byte: number) => acc + String.fromCharCode(byte), "")
    }

    return btoa(binaryString)
}
