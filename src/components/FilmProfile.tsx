import React from "react";
import CSS from "csstype";
import {CardMedia, Container, TextField} from "@mui/material";
import domain from "../domain";
import GetImage from "./Getimage";
interface IFilmProps {
    film: Film

}
const FilmProfile = (props: IFilmProps ) => {
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
    return(<Container style={{display:'flex'}}>
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
        <Container>
            <GetImage type="users" id={film.directorId} />
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


    );
}
export default FilmProfile;