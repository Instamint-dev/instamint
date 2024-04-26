import React from "react"

interface ButtonProps{
    value : string
    type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
    onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
}
export default ButtonProps