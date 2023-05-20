import axios from 'axios';
import React, {useState} from "react";
import CSS from 'csstype';
import {
    Paper,
    AlertTitle,
    Alert,
    Box,
    ToggleButton,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
} from "@mui/material";
import FilmListObject from "./FilmListObject";
import Search from "./Search";
import domain from "../domain";
import Radio from "@mui/material/Radio";



const FilmList = (props: any) => {
    const [films, setFilms] = React.useState <Array<Film>>([])
    const [currentPage, setCurrentPage] = React.useState(1);
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [FilmsPerPage,setFilmsPerPage] = React.useState(10)
    const [showNoOFFilm,setShowNoOFFilm] = React.useState(false);
    // console.log(props.query.queryString)


    React.useEffect(() => {
        const getFilms = () => {
            // console.log(localStorage.getItem("searchString").toString())
            let requestLink ;
            if(localStorage.getItem("searchString")!= null){
                requestLink = domain  + "/films"+localStorage.getItem("searchString")
            } else {
                requestLink =  domain  + "/films";
            }
            axios.get(requestLink)

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

    const totalPages = Math.ceil(films.length / FilmsPerPage);

    const handlePageClick = (pageNumber: React.SetStateAction<number>) => {
        setCurrentPage(pageNumber);
    };

    const displayFilms = () => {
        const startIndex = (currentPage - 1) * FilmsPerPage;
        const endIndex = startIndex + FilmsPerPage;
        const filmsToDisplay = films.slice(startIndex, endIndex);

        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {filmsToDisplay.map((film) => (
                    <FilmListObject key={film.filmId + film.title} film={film} />
                ))}
            </div>
        );
    };

    const displayPagination = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }

        return (
            <div>
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        disabled={pageNumber === currentPage}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        );
    };
    const handleToggle = (state:any,setState: React.Dispatch<React.SetStateAction<any>>) => {
        setState(!state);

    }
    const  DisplayFilmPerPage = () => {

        return (

            <div style={{display:"inline-grid"}}>
                <ToggleButton
                    value="check"
                    selected={showNoOFFilm}
                    onChange={(event,newState)=>handleToggle(showNoOFFilm,setShowNoOFFilm)}
                >
                    Display films per page
                </ToggleButton>
                {showNoOFFilm && (

                    <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                        <FormLabel component="legend">Choose number of films per page</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            onChange={(event) => setFilmsPerPage(parseInt(event.target.value))}
                        >
                            <FormControlLabel value="5" control={<Radio />} label="5 film per page" />
                            <FormControlLabel value="6" control={<Radio />} label="6 film per page" />
                            <FormControlLabel value="7" control={<Radio />} label="7 film per page" />
                            <FormControlLabel value="8" control={<Radio />} label="8 film per page" />
                            <FormControlLabel value="9" control={<Radio />} label="9 film per page" />
                            <FormControlLabel value="10" control={<Radio />} label="10 film per page" />

                        </RadioGroup>
                    </FormControl>
                )
                }
            </div>
        )
    }

    const DisplayFilmList = () =>{
        return (<div>
            <div>{DisplayFilmPerPage()}</div>
            <div>
                <div style={{display: 'flex', padding: "20px", flexWrap: 'wrap', gap: '10px'}}>
                    {displayFilms()}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                    {displayPagination()}
                </div>
            </div>
        </div>)
    }


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
                <div>{DisplayFilmList()}</div>
        );
    }
};

export default FilmList;