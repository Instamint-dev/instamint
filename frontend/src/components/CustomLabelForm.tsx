import React from "react"
import LabelProp from "../type/label_prop"

const CustomLabelForm: React.FC<LabelProp & { children?: string }> = ({ htmlFor, children }) =>
    <div>
       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={htmlFor}>{children}</label> 
    </div>

export default CustomLabelForm
