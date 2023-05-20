import React from "react";

const handleToggle = (state:any,setState: React.Dispatch<React.SetStateAction<any>>) => {
    setState(!state);

}

export default handleToggle;