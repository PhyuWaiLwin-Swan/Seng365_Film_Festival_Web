import React, {useEffect} from "react";
import CSS from "csstype";
import {CardMedia, Container, TextField, ToggleButton, Typography} from "@mui/material";
import domain from "../domain";
import GetImage from "./Getimage";
import FilmList from "./FilmList";
import Films from "./Films";
import axios from "axios";
import {handleToggle, removeDuplicateFilms} from "./Helper";
interface IFilmProps {
    film: Film

}

/**
 * The detail of the film to be display in the individual film list
 * @param props
 * @constructor
 */
const FilmProfile = (props: IFilmProps ) => {
    const [film] = React.useState < Film > (props.film)
    const [showSimilarForm,setShowSimilarForm] = React.useState(false)
    const card: CSS.Properties = {
        padding: "30px",
        margin: "20px",
        display: "block",
        marginRight: "20px",
        marginLeft : "20px",
        marginBottom: "20px",
        marginTop: "20px",
    }
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [directorFilm,setDirectorFilm] = React.useState <Array<Film>>([]);
    const [genreFilm,setGenreFilm] = React.useState <Array<Film>>([]);
    const [uniqueFilms, setUniqueFilms] = React.useState<Film[]>([]);
    const displaySimilarFilm = async () => {
        try {
            const [directorResponse, reviewerResponse] = await Promise.all([
                axios.get(domain + '/films?directorId=' + film.directorId),
                axios.get(domain + '/films?genreIds=' + film.genreId)
            ]);

            const directorFilms = directorResponse.data.films;
            const genreFilms = reviewerResponse.data.films;

            setErrorFlag(false);
            setErrorMessage("film is not found");
            setDirectorFilm(directorFilms);
            setGenreFilm(genreFilms);

            const combinedFilms = [...directorFilms, ...genreFilms];
            const uniqueFilms = removeDuplicateFilms(combinedFilms);
            const filmsJSON = JSON.stringify(uniqueFilms);
            localStorage.setItem('films', filmsJSON);
        } catch (error) {
            setErrorFlag(true);
            // setErrorMessage(error.toString());
        }
    };
    useEffect(() => {
        displaySimilarFilm();
    }, []);

    let filmList = null;
    if (showSimilarForm) {

        filmList = <FilmList />;
    }
    return(<div>
        <Container style={{display:'flex', padding: "50px"}}>
        <Container style={{display: 'grid',verticalAlign: 'middle'}} >

            <GetImage type="films" id={film.filmId} />

            <TextField style={{padding:'10px'}}
                id={film.filmId+"_title"}
                label="Title"
                defaultValue={film.title}
                InputProps={{
                    readOnly: true,
                }}
                variant="standard"
            />
            <TextField style={{padding:'8px'}}
                id={film.filmId+"_releaseDate"}
                label="Release Date"
                defaultValue={film.releaseDate.replace("T", " ").slice(0, -5)}
                InputProps={{
                    readOnly: true,
                }}
                variant="standard"
            />

            <div style={{ textAlign: 'left' ,padding:'8px'}}>
            <Typography variant="subtitle1" gutterBottom>
                Description
            </Typography>
                <div>{film.description}</div>
            </div>
            <TextField style={{padding:'8px'}}
                id={film.filmId+"_rating"}
                label="Rating
                "
                defaultValue={film.rating}
                InputProps={{
                    readOnly: true,
                }}
                variant="standard"
            />
        </Container>
        <Container style={{width: "500px", height: "500pxpx", padding: "50px"}}>
            <div style={{width: "400px", height: "400px", padding: "5px"}}>
            <GetImage type="users" id={film.directorId} />
            </div>
            <TextField style={{padding:'10px'}}
                       id={film.filmId+"_directorFname"}
                       label="Director First Name"
                       defaultValue={film.directorFirstName}
                       InputProps={{
                           readOnly: true,
                       }}
                       variant="standard"
            />
            <TextField style={{padding:'8px'}}
                       id={film.filmId+"_directorLname"}
                       label="Director First Name"
                       defaultValue={film.directorLastName}
                       InputProps={{
                           readOnly: true,
                       }}
                       variant="standard"
            />
        </Container>

        </Container>

        <div style={{display:"inline-grid"}}>
            <ToggleButton
                value="check"
                selected={showSimilarForm}
                onChange={(event,newState)=>handleToggle(showSimilarForm,setShowSimilarForm)}
            >
                Similar Film
            </ToggleButton>
            {showSimilarForm && (
                <div style={{background:"lightcyan"}}>{filmList}</div>

            )}
        </div>
        </div>



    );
}
export default FilmProfile;