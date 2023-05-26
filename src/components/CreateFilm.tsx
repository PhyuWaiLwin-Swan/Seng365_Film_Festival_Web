
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
import {CheckAddNewFilm, CheckEditFilm, CheckImageFile, CheckRegisterError} from "./Helper";
import AlertBar from "./alertBar";
// Inside your component

interface CreateFilmProps {
    isCreate: boolean;
    title: string;
    filmId?: number;
}
interface FilmData {
    title: string;
    description: string;
    genreId: number;
    releaseDate?: string; // Make releaseDate property optional
    runtime?:number;
    ageRating?:string;
}

/**
 * create a new film or edit the film, they are distinguish by the boolean and title.
 * @param isCreate boolan indicate edit or create
 * @param title header to display in the form
 * @param filmId the film id that it is edit.
 * @constructor
 */
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
    const futureDate = dayjs().add(0, 'month');
    React.useEffect(() => {
        if (!isCreate) {
            axios
                .get(domain + "/films/" + filmId)
                .then((response) => {
                    setErrorFlag(false);
                    setErrorMessage("");
                    setFilm(response.data);
                }, (error) => {

                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
    }, [filmId]);
    const [imageError, setImageError] = useState(false);

    const imageSrc = imageError ? defaultImage : `${domain}/${"films"}/${film.filmId}/image`;


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Use optional chaining
        if (file) {
            setImageFile(file);
        }
    };
    const handleRemoveImage = () => {
        setImageFile(null);


    }
    const submitCreateFilm = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var data: FilmData = {
            title: film.title,
            description: film.description,
            genreId: film.genreId
        };
        if (film.releaseDate !== "" && dayjs(film.releaseDate) > dayjs().subtract(1,"day")) {
            const formattedDate = dayjs(film.releaseDate).format('YYYY-MM-DD HH:mm:ss');

            data = {
                ...data, // Keep existing properties
                "releaseDate": formattedDate, // Update the releaseDate property
            };
        }
        if (film.runtime !== 0 && film.runtime !== null && ! isNaN(film.runtime)) {
            data = {
                ...data, // Keep existing properties
                "runtime": film.runtime // Update the releaseDate property
            };
        }
        if (film.ageRating !== "") {
            data = {
                ...data, // Keep existing properties
                "ageRating": film.ageRating // Update the releaseDate property
            };
        }

        e.preventDefault();


        if (isCreate) {
            e.preventDefault();
            const url = isCreate ? domain + '/films' : domain + '/films/' + film.filmId;
            e.preventDefault();
            if(imageFile) {
                axios.post(domain + "/films", data, {
                        headers: {
                            'X-Authorization': localStorage.getItem("token"),
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then((response) => {
                        setErrorFlag(false)
                        setErrorMessage("")
                        var createdFilmId = response.data.filmId
                            axios.put(domain + "/films/" + createdFilmId + "/image", imageFile, {
                                    headers: {
                                        'X-Authorization': localStorage.getItem("token"),
                                        'Content-Type': imageFile.type
                                    }
                                }
                            )
                                .then((response) => {
                                    setErrorFlag(false)
                                    setErrorMessage("")
                                    navigate('/films/' + createdFilmId)

                                }, (error) => {

                                    setErrorFlag(true)
                                    setErrorMessage(error.toString())
                                    const [status, message] = CheckImageFile(error.response.status);
                                    localStorage.setItem("alertStateMessage", message);

                                    axios.delete(domain + '/films/' + createdFilmId,

                                        {
                                            headers: {
                                                'X-Authorization': localStorage.getItem("token")
                                            }
                                        }

                                    )

                                        .then((response) => {

                                            localStorage.setItem("alertStateMessage", "Fail to create image! please check the image type or upload an image. Create film also fail");


                                        }, (error) => {

                                            setErrorFlag(true)
                                            setErrorMessage(error.toString())
                                            localStorage.setItem("alertStateMessage", "Error ocuur when create film is unsuccessful");
                                        })





                                })

                    }, (error) => {

                        setErrorFlag(true)
                        setErrorMessage(error.toString())
                        const [status, message] = CheckAddNewFilm(error.response.status);
                        localStorage.setItem("alertStateMessage", message);
                    })
            } else {
                setErrorFlag(true)
                localStorage.setItem("alertStateMessage", "Please select an image to create a fim");
            }
        } else {
            e.preventDefault();
            const url = domain + '/films/' + film.filmId;

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
                    }, (error) => {
                        setErrorFlag(true);
                        setErrorMessage(error.toString());
                    });
            }
            axios.patch(url, data, {
                headers: {
                    'X-Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    setErrorFlag(false);
                    setErrorMessage('');
                    navigate('/films/' + film.filmId);

                },(error) => {
                    setErrorFlag(true);
                    setErrorMessage(error.toString());
                    const [status, message] = CheckEditFilm(error.response.status);
                    localStorage.setItem("alertStateMessage",message );
                });
        }


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
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                image={imageFile ? URL.createObjectURL(imageFile) : imageSrc ||defaultImage}
                                onError={() => setImageError(true)}
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
                            required
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
                            required
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
                            helperText={"value between 1 to 300"}
                            defaultValue={isCreate ? '' : (film.runtime === 0? "":film.runtime)}
                            InputProps={{
                                readOnly: false,
                                inputProps: {
                                    pattern: "^([1-9]|[1-9][0-9]|[12][0-9]{2}|300)$",
                                    title: "Please enter a value between 1 and 300",
                                },
                            }}
                            variant="standard"
                            value={film.runtime ? film.runtime:null}
                            onChange={(e) => setFilm((prevFilm) => ({
                                ...prevFilm, runtime: parseInt(e.target.value) }))}
                        />
                    </div>

                    {(isCreate) &&

                    <div className="eachBox">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                className="dateTimeSelecter"
                                onChange={handleReleaseDateChange}
                                views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                                value={dayjs(film.releaseDate)||null}
                                minDateTime={dayjs(futureDate.toDate())}
                                disabled={dayjs(film.releaseDate).isBefore(dayjs().subtract(1, 'day'))}
                            />
                        </LocalizationProvider>
                    </div>
                    }

                    {(!isCreate) &&
                        <div>
                    {dayjs(film.releaseDate) >= dayjs().subtract(1,"day") &&
                        <div className="eachBox">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        className="dateTimeSelecter"
                        onChange={handleReleaseDateChange}
                        views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                        value={dayjs(film.releaseDate)||null}
                        minDateTime={dayjs(futureDate.toDate())}
                        disabled={dayjs(film.releaseDate).isBefore(dayjs().subtract(1, 'day'))}
                        />
                        </LocalizationProvider>
                        </div>
                    }
                    {dayjs(film.releaseDate) < dayjs().subtract(1,"day") &&
                        <div className="eachBox">
                        <TextField
                        style={{width: '100%'}}
                        id={film.filmId + '_releaseDate'}
                        label="Release Date"
                        required
                        defaultValue={isCreate ? '' : film.releaseDate} // Handle the case when description is null
                        InputProps={{
                        readOnly: false,
                    }}
                        variant="standard"
                        value={film.releaseDate.replace("T", " ").slice(0, -5)}
                        />
                        </div>
                    }
                        </div>
                    }

                    <div className="eachBox">
                        <FormControl fullWidth >
                            <InputLabel id="select_genre">Genre</InputLabel>

                            <Select
                                labelId="genre_label"
                                id="genre"
                                label="Genre"
                                required
                                value={film.genreId||""}
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

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button style={{ height: '55px' }} onClick={() => window.history.back()} variant="contained">
                            Back
                        </Button>
                        <Button style={{ height: '55px' }} type="submit" variant="contained">
                            Submit
                        </Button>
                    </div>
                </form>
                {errorFlag && <AlertBar></AlertBar>
                }
            </Container>
        </div>


    }



    return (<div>{CreateFilmPage()}</div>)
















}

export default CreateFilm;