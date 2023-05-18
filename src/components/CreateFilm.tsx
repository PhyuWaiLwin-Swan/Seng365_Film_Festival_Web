
import React, { useState } from 'react';
// import { makeStyles } from "@mui/material/styles";
import {
    Card,
    CardMedia, Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel, InputLabel, Select,
    TextField,
    ToggleButton
} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import axios from "axios/index";
import axios from "axios";
import domain from "../domain";
import {useNavigate} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// Inside your component

const CreateFilm = () => {

    const[film,setFilm] = React.useState<Film>({
        filmId : 0,
        title : "",
        directorFirstName: '',

        directorLastName: '',
        releaseDate : '',
        image_filename : '',
        runtime : 0,
        directorId : 0,
        genreId : 0,
        rating : '',
        ageRating: '',
        description: ''
    })
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const navigate = useNavigate();
    const submitCreateFilm = (e: { preventDefault: () => void; }) => {
        setFilm((prevFilm) => ({ ...prevFilm, directorId: localStorage.getItem("userId") as unknown as number}));



            e.preventDefault();

            axios.post(domain  + "/films", {
                "title": film.title,
                "description": film.description,
                "releaseDate": film.releaseDate,
                "genreId": film.genreId,
                "runtime": film.runtime,
                "ageRating": film.ageRating
                }

            )
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    navigate('/films/'+response.data.filmId)

                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
    }
    const [genre,setGenre] = useState<Array<Genre>>([]);
    const genreList = genre.map(obj=>obj.name);

    const ageRatingList = ["G", "PG", "M", "R13", "R16", "R18", "TBC"]
    const RatingItem = () => {
        const RatingItem: JSX.Element[] = [];

        ageRatingList.forEach((rating) => {
            RatingItem.push(
                <MenuItem key={rating} value={rating}>
                    {rating}
                </MenuItem>
            );
        });

        return RatingItem;
    };

    React.useEffect(()=>{
        const getGenres = () => {
            axios.get(domain+ "/films/genres")
                .then((response) => {
                    setGenre(response.data)
                })

        }
        getGenres()
    },[setGenre])





    function Label({
                       componentName,
                       valueType,
                       isProOnly,
                   }: {
        componentName: string;
        valueType: string;
        isProOnly?: boolean;
    }) {
        const content = (
            <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
        );

        if (isProOnly) {
            return (
                <Stack direction="row" spacing={0.5} component="span">
                    <Tooltip title="Included on Pro package">
                        <a href="/x/introduction/licensing/#pro-plan">
                            <span className="plan-pro" />
                        </a>
                    </Tooltip>
                    {content}
                </Stack>
            );
        }

        return content;
    }














    const CreateFilmPage = () => {
        return (<div>
            <Container style={{display: 'inline-grid', padding: "10px",verticalAlign: 'middle'}} >
                <form
                    // className={classes.root}
                    onSubmit={submitCreateFilm}>
                <CardMedia style={{padding:'20px'}}
                           src={domain+`/films/${film.filmId}/image` }
                           component="img"
                           height="400"
                           width="400"
                           image= {film.image_filename}
                           alt=""
                />
                {/*<> Description : {film.description}</>*/}

                <TextField style={{padding:'10px'}}
                           id={film.filmId+"_title"}
                           label="Title"
                           defaultValue={film.title}
                           InputProps={{
                               readOnly: false,
                           }}
                           variant="standard"
                           onChange= {(e) => setFilm((prevFilm) => ({ ...prevFilm, title:  e.target.value}))}

                />
                <TextField style={{padding:'8px'}}
                           id={film.filmId+"_description"}
                           label="Description"
                           // defaultValue={film.description}
                           InputProps={{
                               readOnly: false,
                           }}
                           variant="standard"
                           multiline
                           rows={3}

                           onChange= {(e) => setFilm((prevFilm) => ({ ...prevFilm, description:  e.target.value}))}
                />
                <TextField style={{padding:'8px'}}
                           id={film.filmId+"_runtime"}
                           label="Run Time"
                           defaultValue={film.runtime}
                           InputProps={{
                               readOnly: false,
                           }}
                           variant="standard"
                           onChange= {(e) => setFilm((prevFilm) => ({ ...prevFilm, runtime:  parseInt(e.target.value)}))}
                />
                    {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
                    {/*    /!* Your component content *!/*/}
                    {/*</LocalizationProvider>*/}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                                'DatePicker',
                                'TimePicker',
                                'DateTimePicker',
                                'DateRangePicker',
                            ]}
                        >
                            <DemoItem
                                label={<Label componentName="DateTimePicker" valueType="date time" />}
                            >
                                <DateTimePicker />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                {/*<TextField style={{padding:'8px'}}*/}
                {/*           id={film.filmId+"_releaseDate"}*/}
                {/*           label="Release Date"*/}
                {/*           defaultValue={film.releaseDate}*/}
                {/*           InputProps={{*/}
                {/*               readOnly: false,*/}
                {/*           }}*/}
                {/*           variant="standard"*/}
                {/*           onChange= {(e) => setFilm((prevFilm) => ({ ...prevFilm, title:  e.target.value}))}*/}
                {/*/>*/}
                <FormControl fullWidth>
                    <InputLabel id="select_genre">Genre</InputLabel>

                    <Select
                        labelId="genre_label"
                        id="genre"
                        label="Genre"
                        onChange= {(e) => setFilm((prevFilm) => ({ ...prevFilm, genreId:  parseInt(e.target.value as string)}))}

                    >
                        {genre.map(({ genreId, name }) => (
                            <MenuItem key={genreId} value={genreId}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="select_ageRating">Age Rating</InputLabel>

                    <Select
                        labelId="ageRating_label"
                        id="ageRating"
                        label="ageRating"
                        onChange={(e) => setFilm((prevFilm) => ({ ...prevFilm, ageRating:  e.target.value as string}))}
                    >
                        {ageRatingList.map((age) => (
                            <MenuItem key={age} value={age} >
                                {age}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
                </form>

            </Container>
        </div>)


    }



    return (<div>{CreateFilmPage()}</div>)
















}

export default CreateFilm;