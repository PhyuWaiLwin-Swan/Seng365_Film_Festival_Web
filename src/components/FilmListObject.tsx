import React, {useState} from "react";
import {
    Alert,
    AlertTitle,
    Card,
    CardActionArea,
    CardContent,
    CardMedia, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Paper,
    Typography
} from "@mui/material";
import CSS from "csstype";
import domain from "../domain";
import {useFilmStore} from "../store/useFilmStore";
import axios from "axios";
import Button from "@mui/material/Button";
import defaultImage from "../default-image.png";
import {useNavigate} from "react-router-dom";
import GetImage from "./Getimage";
interface IFilmProps {
    film: Film

}

const FilmListObject = (props: IFilmProps) => {

    const [film] = React.useState < Film > (props.film)

    const card: CSS.Properties = {
        padding: "30px",
        margin: "20px",
        display: "block",
        marginRight: "20px",
        marginLeft : "20px",
        marginBottom: "20px",
        marginTop: "20px",
    }


    return (

        <div style={{padding:"10px"}}>
            <Card sx={{ maxWidth: 400 }} >
                <CardActionArea component="a" href={`/films/${film.filmId}`}>
                    <Card>
                        <GetImage type="films" id={film.filmId} />
                    </Card>

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Title : {film.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Director Full Name : {film.directorFirstName} {film.directorLastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Age rating : {film.ageRating}

                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Release Date : {film.releaseDate}

                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Genre : {film.genreId}

                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Rating : {film.rating}

                        </Typography>


                    </CardContent>
                </CardActionArea>


            </Card>
        </div>
)
    }

export default FilmListObject;