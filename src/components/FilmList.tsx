import axios from 'axios';
import React from "react";
import CSS from 'csstype';
import {Paper, AlertTitle, Alert, Box,} from "@mui/material";
import FilmListObject from "./FilmListObject";

const FilmList = () => {

    const [films, setFilms] = React.useState <Array<Film>>([])
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        const getFilms = () => {
            axios.get("https://seng365.csse.canterbury.ac.nz/api/v1" + "/films")

                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("film is not found")
                    setFilms(response.data.films)
                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getFilms()

    }, [setFilms])

    const film_rows = () => films.map((film: Film) => <FilmListObject key={film.filmId + film.title} film={film}/>)
    const card: CSS.Properties = {
        padding: "10px",
        margin: "20px",
        display: "block",
        width: "fit-content"
    }

    return (







        <div className="paper-grid">
            <div className="paper-row">
                {errorFlag ?
                    <Alert severity="error">

                        <AlertTitle> Error </AlertTitle>

                        {errorMessage}

                    </Alert> : ""}

                {film_rows()}

            </div>
</div>
    )
}

export default FilmList;