import React, {ChangeEvent} from "react"

interface ButtonRadioProps{
    value : string
    type: React.InputHTMLAttributes<HTMLInputElement>["type"]
    checked: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default ButtonRadioProps