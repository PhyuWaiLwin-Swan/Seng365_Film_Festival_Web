import React from "react";
import CSS from "csstype";
import {CardMedia, Container, TextField, ToggleButton} from "@mui/material";
import domain from "../domain";
import GetImage from "./Getimage";
import handleToggle from "./Helper";
import FilmList from "./FilmList";
interface IFilmProps {
    film: Film

}
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
    const dislplaySimilarFilm = () =>{
        let queryParams = "?directorId="+ film.directorId +"&"+"genreId="+film.genreId;
        localStorage.setItem("searchString", queryParams)

        return <FilmList></FilmList>;
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
                defaultValue={film.releaseDate}
                InputProps={{
                    readOnly: true,
                }}
                variant="standard"
            />
            <TextField style={{padding:'8px'}}
                id={film.filmId+"_description"}
                label="Description"
                defaultValue={film.description}
                InputProps={{
                    readOnly: true,
                }}
                variant="standard"
                       multiline
                       rows={3}
            />
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
                <div>{dislplaySimilarFilm()}</div>

            )}
        </div>
        </div>



    );
}
export default FilmProfile;