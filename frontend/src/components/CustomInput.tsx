import React from "react"
import InputProps from "../type/form/input_prop"

const CustomInput: React.FC<InputProps> = ({ type,placeholder, value, onChange,id,name }) =>
        <div>
            <input
                type={type}
                className={"shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                id={id}
                name={name}
            />
        </div>


export default CustomInput
