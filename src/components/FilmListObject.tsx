import React, {useState} from "react";
import {
    Alert,
    AlertTitle,
    Card,
    CardActionArea,
    CardContent,
    CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Grid,
    Paper, TextField,
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
    const [genres,setGenre] = useState<Array<Genre>>([]);
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const card: CSS.Properties = {
        padding: "30px",
        margin: "20px",
        display: "block",
        marginRight: "20px",
        marginLeft : "20px",
        marginBottom: "20px",
        marginTop: "20px",
    }

    React.useEffect(()=>{
        const getGenres = () => {
            axios.get(domain+ "/films/genres")
                .then((response) => {
                    setGenre(response.data)
                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })

        }
        getGenres()
    },[setGenre])
    if (errorFlag) {
        return (
            <div>

                <h1>Users</h1>
                <div style={{color: "red"}}>
                    {errorMessage}

                </div>

            </div>

        )
    } else {
        return (

            <div style={{padding: "10px"}}>
                <Card sx={{maxWidth: 400}}>
                    <CardActionArea component="a" href={`/films/${film.filmId}`}>
                        <Card>
                            <GetImage type="films" id={film.filmId}/>
                        </Card>

                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                Title : {film.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Age rating : {film.ageRating}

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Release Date : {film.releaseDate}

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <span>Genre: </span>
                                <span>{genres.find((genre) => genre.genreId === film.genreId)?.name}</span>

                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Rating : {film.rating}

                            </Typography>
                            <Grid item xs={6}>
                                <Container style={{display: "flex"}}>
                                    <div style={{width: "40px", height: "40px", padding: "5px"}}>
                                        <GetImage type="users" id={film.directorId}/>
                                    </div>
                                    <div>
                                        <Typography variant="body2" color="text.secondary">
                                            Director first name : {film.directorFirstName}

                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Director last name : {film.directorLastName}

                                        </Typography>
                                    </div>
                                </Container>
                            </Grid>


                        </CardContent>
                    </CardActionArea>


                </Card>
            </div>
        )
    }
    }

export default FilmListObject;