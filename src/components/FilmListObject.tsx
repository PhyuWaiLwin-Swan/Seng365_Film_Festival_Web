import React from "react";
import {Alert, AlertTitle, Card, CardActionArea, CardContent, CardMedia, Paper, Typography} from "@mui/material";
import CSS from "csstype";
interface IFilmProps {
    film: Film

}

const FilmListObject = (props: IFilmProps) => {
    const [film] = React.useState < Film > (props.film)
    const card: CSS.Properties = {
        padding: "50px",
        margin: "60px",
        display: "block",
        width: ""
    }
    return (


        // <Paper elevation={3} style={card}>
        //
        //     <h4>{film.title} </h4>
        //
        // </Paper>
        // <h3>{film.title}</h3>
    <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image= {film.image_filename}
                alt=""
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Title : {film.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Director Full Name : {film.directorFirstName} {film.directorLastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Release Date : {film.releaseDate}

                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
)

    }
export default FilmListObject;