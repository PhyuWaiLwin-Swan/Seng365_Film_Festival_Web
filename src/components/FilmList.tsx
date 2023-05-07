import axios from 'axios';
import React from "react";
import CSS from 'csstype';
import {Paper, AlertTitle, Alert, Box,} from "@mui/material";
import FilmListObject from "./FilmListObject";
function chunkData(data: Film[]) {
    const chunkSize = 5; // number of items per row
    const chunks = [];

    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }

    return chunks;
}
// const FilmList = () => {
//
//     const [films, setFilms] = React.useState <Array<Film>>([])
//     const [errorFlag, setErrorFlag] = React.useState(false)
//     const [errorMessage, setErrorMessage] = React.useState("")
//     const filmChunk = chunkData(films)
//
//     React.useEffect(() => {
//         const getFilms = () => {
//             axios.get("https://seng365.csse.canterbury.ac.nz/api/v1" + "/films")
//
//                 .then((response) => {
//                     setErrorFlag(false)
//                     setErrorMessage("film is not found")
//                     setFilms(response.data.films)
//                 }, (error) => {
//
//                     setErrorFlag(true)
//                     setErrorMessage(error.toString())
//                 })
//         }
//         getFilms()
//
//     }, [setFilms])
//
// //     const film_rows = () => {
// //     for (const filmSubset of filmChunk) {
// //     filmSubset.map((film: Film) => <FilmListObject key={film.filmId + film.title} film={film}/>)
// // }}
//
//     const film_rows = () => {
//         return filmChunk.map((filmSubset, index) => (
//             // <Paper key={index} style={card}>
//                 <div style={{ display: 'flex' }}>
//                 {filmSubset.map((film: Film) => (
//                     <FilmListObject key={film.filmId + film.title} film={film} />
//                 ))}
//                 </div>
//             // </Paper>
//         ));
//     };
//     const card: CSS.Properties = {
//         padding: "10px",
//         margin: "20px",
//         display: "block",
//         width: "fit-content"
//     }
//
//     return (
//         <div style={{padding:"100px"}}>
//                 {errorFlag ?
//                     <Alert severity="error">
//
//                         <AlertTitle> Error </AlertTitle>
//
//                         {errorMessage}
//
//                     </Alert> : ""}
//
//                 {film_rows()}
//
//             </div>
//
//     )
// }

// export default FilmList;










const FilmsPerPage = 10;

const FilmList = () => {
    const [films, setFilms] = React.useState <Array<Film>>([])
    const [currentPage, setCurrentPage] = React.useState(1);
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const filmChunk = chunkData(films)

    React.useEffect(() => {
        const getFilms = () => {
            axios.get("https://seng365.csse.canterbury.ac.nz/api/v1" + "/films")

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

    return (
        <div >
            <div style={{ display: 'flex', padding: "20px", flexWrap: 'wrap', gap: '10px' }}>
                {displayFilms()}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                {displayPagination()}
            </div>
        </div>
    );
};

export default FilmList;