import axios from 'axios';
import React, {useState} from "react";
import CSS from 'csstype';
import {Paper, AlertTitle, Alert, Box,} from "@mui/material";
import FilmListObject from "./FilmListObject";
import Search from "./Search";
import domain from "../domain";
function chunkData(data: Film[]) {
    const chunkSize = 5; // number of items per row
    const chunks = [];

    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }

    return chunks;
}

const FilmsPerPage = 10;

const FilmList = (props: any) => {
    const [films, setFilms] = React.useState <Array<Film>>([])
    const [currentPage, setCurrentPage] = React.useState(1);
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const filmChunk = chunkData(films)
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
            <div style={{padding: "20px"}}>
                <Search></Search>
                <div>
                    <div style={{display: 'flex', padding: "20px", flexWrap: 'wrap', gap: '10px'}}>
                        {displayFilms()}
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                        {displayPagination()}
                    </div>
                </div>
            </div>
        );
    }
};

export default FilmList;