import React,{ ChangeEvent } from "react"

interface InputProps {
    id: string
    type: React.InputHTMLAttributes<HTMLInputElement>["type"]
    placeholder: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    name: string
    disabled: boolean
}
export default InputProps