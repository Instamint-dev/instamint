import React from "react"
import ButtonProps from "../type/form/button_prop"
const CustomInput: React.FC<ButtonProps> = ({ value , type, onClick}) =>
        <div>
            <button onClick={onClick} type={type} className="bg-gray-800 dark:bg-gray-200 dark:text-gray-800 text-white font-bold py-2 px-4 my-4 rounded focus:outline-none focus:shadow-outline">
                {value}
            </button>
        </div>


export default CustomInput
