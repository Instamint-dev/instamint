import React, {ChangeEvent} from "react";

interface buttonradio_props{
    value : string
    type: React.InputHTMLAttributes<HTMLInputElement>["type"];
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default buttonradio_props;