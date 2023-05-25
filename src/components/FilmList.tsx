import axios from 'axios';
import React, {useEffect, useState} from "react";
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


interface FilmListProps {
    films: Film[];
}

/**
 * The list of the film to be display it will call film list object
 * for the display
 * @constructor
 */
const FilmList =() => {
    const [films, setFilms] = useState<Film[]>([]);

    useEffect(() => {
        const storedFilms = localStorage.getItem('films');
        if (storedFilms) {
            const parsedFilms = JSON.parse(storedFilms);
            setFilms(parsedFilms);
        }
    }, []);




    const [currentPage, setCurrentPage] = React.useState(1);
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const [FilmsPerPage,setFilmsPerPage] = React.useState(10)
    const [showNoOFFilm,setShowNoOFFilm] = React.useState(false);



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



        return (
                <div>{DisplayFilmList()}</div>
        );

};

export default FilmList;