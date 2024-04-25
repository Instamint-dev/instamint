import React from "react"

interface ButtonProps{
    value : string
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export default ButtonProps