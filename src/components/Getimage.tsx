import defaultImage from "../default-image.png";
import domain from "../domain";
import {CardMedia} from "@mui/material";
import React, {useState} from "react";


const GetImage = ({ type, id }: { type: string, id: number}) => {
    const [imageError, setImageError] = useState(false);

    const imageSrc = imageError ? defaultImage : `${domain}/${type}/${id}/image`;

    return (
        <CardMedia
            src={imageSrc}
            className="app-img"
            component="img"
            onError={() => setImageError(true)}
        />
    );
};
export default GetImage;