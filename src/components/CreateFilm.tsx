
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
import dayjs, { Dayjs  } from 'dayjs';
import { DemoContainer,DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import defaultImage from './../default-image.png';
import './../App.css';
import {CheckAddNewFilm, CheckEditFilm, CheckRegisterError} from "./Helper";
import AlertBar from "./alertBar";
// Inside your component

interface CreateFilmProps {
    isCreate: boolean;
    title: string;
    filmId?: number;
}


const CreateFilm: React.FC<CreateFilmProps> = ({ isCreate, title, filmId }) => {

    const [film, setFilm] = useState({
        filmId: filmId || 0,
        title: '',
        directorFirstName: '',
        directorLastName: '',
        releaseDate: '',
        image_filename: '',
        runtime: 0,
        directorId: 0,
        genreId: 0,
        rating: '',
        ageRating: '',
        description: "",
    });
    const[isCreateFilm,setIsCreateFilm] = React.useState(isCreate)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const navigate = useNavigate();
    const [value, setValue] = React.useState<Dayjs >();
    const [imageFile, setImageFile] = useState<File | null>(null);
    React.useEffect(() => {
        if (!isCreate) {
            axios
                .get(domain + "/films/" + filmId)
                .then((response) => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    setFilm(response.data);
                })
                .catch((error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());

                });
        }
    }, [filmId]);



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
        if (isCreate) {
            const url = isCreate ? domain + '/films' : domain + '/films/' + film.filmId;
            e.preventDefault();

            axios.post(domain + "/films", {
                    "title": film.title,
                    "description": film.description,
                    "releaseDate": film.releaseDate,
                    "genreId": film.genreId,
                    "runtime": film.runtime,
                    "ageRating": film.ageRating
                }, {
                    headers: {
                        'X-Authorization': localStorage.getItem("token"),
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    // setFilm((prevFilm) => ({ ...prevFilm, filmId:  response.data.filmId}))
                    if (imageFile) {
                        axios.put(domain + "/films/" + response.data.filmId + "/image", imageFile, {
                                headers: {
                                    'X-Authorization': localStorage.getItem("token"),
                                    'Content-Type': 'image/gif'
                                }
                            }
                        )
                            .then((response) => {
                                setErrorFlag(false)
                                setErrorMessage("")
                                navigate('/films/' + response.data.filmId)

                            }, (error) => {

                                setErrorFlag(true)
                                setErrorMessage(error.toString())
                                e.preventDefault();
                            })
                    }
                    console.log(response.data.filmId);
                    navigate('/films/' + response.data.filmId)

                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                    const [status, message] = CheckAddNewFilm(error.response.status);
                    localStorage.setItem("alertStateMessage",message );
                })

        } else {
            e.preventDefault();
            const url = domain + '/films/' + film.filmId;
            const dateTimeString = film.releaseDate;
            const parsedDateTime = new Date(dateTimeString);
            const formattedDateTime = parsedDateTime.toISOString().replace("T", " ").slice(0, -5);
            if (imageFile) {
                axios.put(domain + '/films/' + film.filmId + '/image', imageFile, {
                    headers: {
                        'X-Authorization': localStorage.getItem('token'),
                        'Content-Type': 'image/png'
                    }
                })
                    .then((response) => {
                        setErrorFlag(false);
                        setErrorMessage('');
                        alert("image sending")
                    }, (error) => {
                        setErrorFlag(true);
                        setErrorMessage(error.toString());
                        alert(error.toString())
                    });
            }
            axios.patch(url, {
                title: film.title,
                description: film.description,
                releaseDate: formattedDateTime,
                genreId: film.genreId,
                runtime: film.runtime,
                ageRating: film.ageRating
            }, {
                headers: {
                    'X-Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setErrorFlag(false);
                    setErrorMessage('');
                    console.log(response.data.filmId);
                    navigate('/films/' + film.filmId);
                })
                .catch((error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                    const [status, message] = CheckEditFilm(error.response.status);
                    localStorage.setItem("alertStateMessage",message );
                });
        }
        console.log(localStorage.getItem("token"));


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


    const handleReleaseDateChange = (value: dayjs.Dayjs | null| undefined) => {
        if (value) {
            const formattedDate = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
            setFilm((prevFilm) => ({
                ...prevFilm,
                releaseDate: formattedDate,
            }));
        } else {
            setFilm((prevFilm) => ({
                ...prevFilm,
                releaseDate: '', // Set the releaseDate to empty string if no value selected
            }));
        }
    };

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
                    verticalAlign: 'middle',
                }}
            >
                <form onSubmit={submitCreateFilm}>
                    <h1>{title}</h1>
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

                    <div style={{ padding: '10px' }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleImageUpload(event)}
                        />

                        {imageFile && <Button onClick={handleRemoveImage}>Remove Image</Button>}
                    </div>

                    <div className="eachBox">
                        <TextField
                            style={{ width: '100%' }}
                            id={film.filmId + '_title'}
                            label="Title"
                            defaultValue={isCreate ? '' : film.title}
                            InputProps={{
                                readOnly: false,
                            }}
                            variant="standard"
                            value={film.title}
                            onChange={(e) => setFilm((prevFilm) => ({ ...prevFilm, title: e.target.value }))}
                        />
                    </div>

                    <div className="eachBox">
                        <TextField
                            style={{ width: '100%' }}
                            id={film.filmId + '_description'}
                            label="Description"
                            defaultValue={isCreate ? '' : film.description} // Handle the case when description is null
                            InputProps={{
                                readOnly: false,
                            }}
                            variant="standard"
                            value={film.description}
                            onChange={(e) => setFilm((prevFilm) => ({ ...prevFilm, description: e.target.value }))}
                        />
                    </div>

                    <div className="eachBox">
                        <TextField
                            style={{ width: '100%' }}
                            id={film.filmId + '_runtime'}
                            label="Run Time"
                            defaultValue={isCreate ? '' : film.runtime.toString()}
                            InputProps={{
                                readOnly: false,
                            }}
                            variant="standard"
                            value={film.runtime}
                            onChange={(e) => setFilm((prevFilm) => ({ ...prevFilm, runtime: parseInt(e.target.value) }))}
                        />
                    </div>

                    <div className="eachBox">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                className="dateTimeSelecter"
                                onChange={handleReleaseDateChange}
                                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                                value={dayjs(film.releaseDate) || null}

                            />
                        </LocalizationProvider>
                    </div>

                    <div className="eachBox">
                        <FormControl fullWidth>
                            <InputLabel id="select_genre">Genre</InputLabel>

                            <Select
                                labelId="genre_label"
                                id="genre"
                                label="Genre"
                                value={film.genreId.toString() || ''}
                                onChange={(e) => setFilm((prevFilm) => ({ ...prevFilm, genreId: parseInt(e.target.value as string) }))}
                            >
                                {genre.map(({ genreId, name }) => (
                                    <MenuItem key={genreId} value={genreId}>
                                        {name}
                                    </MenuItem>
                                ))}
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
                                value={film.ageRating || ''}
                                onChange={(e) => setFilm((prevFilm) => ({ ...prevFilm, ageRating: e.target.value as string }))}
                            >
                                {ageRatingList.map((age) => (
                                    <MenuItem key={age} value={age}>
                                        {age}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <Button style={{ height: '55px' }} type="submit" variant="contained">
                        Submit
                    </Button>
                </form>
                {errorFlag && <AlertBar></AlertBar>
                }
            </Container>
        </div>


    }



    return (<div>{CreateFilmPage()}</div>)
















}

export default CreateFilm;