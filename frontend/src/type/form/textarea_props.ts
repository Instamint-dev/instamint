import React from "react";

interface textarea_props{
    placeholder: string;
    value?: string;
    rows?: number;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default textarea_props;