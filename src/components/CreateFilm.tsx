
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
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material'; // Update the import for Tooltip
import { Toolbar } from '@mui/material'; // Update the import for Toolbar
import { Typography as MuiTypography } from '@mui/material'; // Rename the import
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer,DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import defaultImage from './../default-image.png';
import './../App.css';
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
    const [value, setValue] = React.useState<Dayjs >();
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Use optional chaining
        if (file) {
            setImageFile(file);
        }
    };
    const handleRemoveImage =  () => {
        setImageFile(null);


    }
    const submitCreateFilm = (e: { preventDefault: () => void; }) => {
            e.preventDefault();
        console.log(film);
            axios.post(domain  + "/films",{
                headers: {
            'X-Authorization': localStorage.getItem("token"),
                'Content-Type': 'application/json'
        }, data:{
                "title": film.title,
                "description": film.description,
                "releaseDate": film.releaseDate,
                "genreId": film.genreId,
                "runtime": film.runtime,
                "ageRating": film.ageRating
                }
    }
            )
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")

                    // navigate('/films/'+response.data.filmId)
                    setFilm((prevFilm) => ({ ...prevFilm, filmId:  response.data.filmId}))

                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        console.log(localStorage.getItem("token"));

        // if (imageFile) {
        //     axios.put(domain + "/films/" + film.filmId, {
        //             headers: {
        //                 'X-Authorization': localStorage.getItem("token"),
        //                 'Content-Type': 'image/gif'
        //             }, data: imageFile
        //         }
        //     )
        //         .then((response) => {
        //             setErrorFlag(false)
        //             setErrorMessage("")
        //             navigate('/films/' + response.data.filmId)
        //
        //         }, (error) => {
        //
        //             setErrorFlag(true)
        //             setErrorMessage(error.toString())
        //         })
        // }
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




    const CreateFilmPage = () => {
        return <div>


            <Container
                style={{
                    display: 'inline-block',
                    width: '600px',
                    backgroundColor: 'white',
                    border: '1px solid gray',
                    borderRadius: '4px',
                    padding: '60px',
                    verticalAlign: 'middle'

                }}
            >
                <form
                    onSubmit={submitCreateFilm}>
                <h1>Create Film</h1>
                <div className="eachBox">

                    <Card>
                        <CardMedia
                            className="app-img"
                            component="img"
                            image={imageFile ? URL.createObjectURL(imageFile) : defaultImage}
                            alt={imageFile ? 'Uploaded' : 'Default'}
                        />
                    </Card>

                </div>

                <div style={{padding: "10px"}}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                handleImageUpload(event)
                            }
                        />

                    {imageFile &&
                        <Button onClick={handleRemoveImage}>Remove Image</Button>}


                    </div >
                <div className="eachBox">
                    <TextField style={{width:"100%"}}
                                   id={film.filmId+"_title"}
                                   label="Title"
                                   defaultValue={film.title}
                                   InputProps={{
                                       readOnly: false,
                                   }}
                                   variant="standard"
                                   onChange= {(e) => setFilm((prevFilm) => ({ ...prevFilm, title:  e.target.value}))}

                        />
                    </div>
                <div className="eachBox">
                    <TextField style={{ width:"100%"}}
                                   id={film.filmId+"_description"}
                                   label="Description"
                                   // defaultValue={film.description}
                                   InputProps={{
                                       readOnly: false,
                                   }}
                                   variant="standard"
                                   onChange= {(e) => setFilm((prevFilm) => ({ ...prevFilm, description:  e.target.value}))}
                        />
                    </div>
                    <div className="eachBox">
                        <TextField style={{ width:"100%"}}
                                   id={film.filmId+"_runtime"}
                                   label="Run Time"
                                   // defaultValue={film.runtime}
                                   InputProps={{
                                       readOnly: false,
                                   }}
                                   variant="standard"
                                   onChange= {(e) => setFilm((prevFilm) => ({ ...prevFilm, runtime:  parseInt(e.target.value)}))}
                        />
                    </div>
                <div className="eachBox">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        className="dateTimeSelecter"
                        onChange={(date: Dayjs | null | undefined) => {
                            if (date) {
                                const formattedDate = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
                                console.log(formattedDate)
                                setFilm((prevFilm) => ({ ...prevFilm, releaseDate: formattedDate }));
                            }
                        }}
                        views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                    />

                </LocalizationProvider>
                </div>

                    <div className="eachBox"><FormControl fullWidth>
                        <InputLabel id="select_genre">Genre</InputLabel>

                        <Select
                            labelId="genre_label"
                            id="genre"
                            label="Genre"
                            onChange= {(e) => setFilm((prevFilm) => ({ ...prevFilm, genreId:  parseInt(e.target.value as string)}))}

                        >
                            {genre.map(({ genreId, name }) => <MenuItem key={genreId} value={genreId}>
                                {name}
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    </div>

                <div className="eachBox">
                    <FormControl fullWidth>
                        <InputLabel id="select_ageRating">Age Rating</InputLabel>

                        <Select
                            labelId="ageRating_label"
                            id="ageRating"
                            label="ageRating"
                            onChange={(e) => setFilm((prevFilm) => ({ ...prevFilm, ageRating:  e.target.value as string}))}
                        >
                            {ageRatingList.map((age) => <MenuItem key={age} value={age} >
                                    {age}
                                </MenuItem>)}

                        </Select>
                    </FormControl>
                </div>
                    <Button style={{height: "55px"}} type="submit" variant="contained">Submit</Button>
                </form>

            </Container>
        </div>


    }



    return (<div>{CreateFilmPage()}</div>)
















}

export default CreateFilm;